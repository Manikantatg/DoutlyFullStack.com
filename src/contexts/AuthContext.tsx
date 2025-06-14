import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'student' | 'freelancer' | 'tutor' | 'team_leader' | 'manager' | 'vertical_head' | 'admin' | 'bda' | 'sales';
  phone?: string;
  skills?: string[];
  institution?: string;
  createdAt: Date;
  ticketNumbers?: string[];
  teamId?: string;
  assignedLeads?: number;
  convertedLeads?: number;
  totalEarnings?: number;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Enhanced role-based email detection for Indian context
const getRoleFromEmail = (email: string): UserProfile['role'] => {
  const domain = email.split('@')[1];
  if (domain !== 'doutly.com') return 'student';
  
  const prefix = email.split('@')[0].toLowerCase();
  
  // Check for exact role matches
  if (prefix === 'admin') return 'admin';
  if (prefix === 'verticalhead' || prefix.includes('verticalhead')) return 'vertical_head';
  if (prefix === 'manager' || prefix.includes('manager')) return 'manager';
  if (prefix === 'teamlead' || prefix === 'teamleader' || prefix.includes('teamlead')) return 'team_leader';
  if (prefix === 'tutor' || prefix.includes('tutor')) return 'tutor';
  if (prefix === 'freelancer' || prefix.includes('freelancer')) return 'freelancer';
  if (prefix === 'bda' || prefix.includes('bda')) return 'bda';
  if (prefix === 'sales' || prefix.includes('sales')) return 'sales';
  
  // Check for role suffixes (name.role@doutly.com)
  const parts = prefix.split('.');
  if (parts.length > 1) {
    const rolePart = parts[parts.length - 1];
    switch (rolePart) {
      case 'admin':
        return 'admin';
      case 'vh':
      case 'verticalhead':
        return 'vertical_head';
      case 'manager':
        return 'manager';
      case 'tl':
      case 'teamlead':
      case 'teamleader':
        return 'team_leader';
      case 'tutor':
        return 'tutor';
      case 'freelancer':
        return 'freelancer';
      case 'bda':
        return 'bda';
      case 'sales':
        return 'sales';
      default:
        return 'student';
    }
  }
  
  return 'student';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signUp = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, {
      displayName: profileData.displayName
    });

    // Determine role based on email
    const detectedRole = getRoleFromEmail(email);
    const finalRole = profileData.role || detectedRole;

    const profile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName: profileData.displayName!,
      role: finalRole,
      phone: profileData.phone,
      skills: profileData.skills,
      institution: profileData.institution,
      createdAt: new Date(),
      ticketNumbers: [],
      assignedLeads: 0,
      convertedLeads: 0,
      totalEarnings: 0
    };

    await setDoc(doc(db, 'users', user.uid), profile);
    setUserProfile(profile);
  };

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserProfile;
          // Update role based on email if it's a doutly.com email
          const detectedRole = getRoleFromEmail(user.email!);
          if (user.email!.endsWith('@doutly.com') && userData.role !== detectedRole) {
            userData.role = detectedRole;
            await setDoc(doc(db, 'users', user.uid), userData);
          }
          setUserProfile(userData);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};