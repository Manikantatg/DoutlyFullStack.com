import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  Calendar, 
  User, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
  Award,
  Star,
  ArrowRight
} from 'lucide-react';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import BackButton from '../../components/BackButton';

interface Lead {
  id: string;
  ticketNumber: string;
  studentId: string;
  subject: string;
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  createdAt: any;
  assignedTo?: string;
}

interface EventRegistration {
  id: string;
  eventTitle: string;
  eventType: string;
  registrationDate: any;
  status: 'pending' | 'approved' | 'rejected';
}

const StudentDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [myLeads, setMyLeads] = useState<Lead[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<EventRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile?.uid) return;

    // Fetch user's leads
    const leadsQuery = query(
      collection(db, 'leads'),
      where('studentId', '==', userProfile.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      
      setMyLeads(leadsData);
      setLoading(false);
    });

    // Fetch user's event registrations
    const registrationsQuery = query(
      collection(db, 'event_registrations'),
      where('email', '==', userProfile.email),
      orderBy('registrationDate', 'desc')
    );

    const unsubscribeRegistrations = onSnapshot(registrationsQuery, (snapshot) => {
      const registrationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EventRegistration[];
      
      setMyRegistrations(registrationsData);
    });

    return () => {
      unsubscribeLeads();
      unsubscribeRegistrations();
    };
  }, [userProfile]);

  const quickActions = [
    {
      title: 'Schedule a Tutor',
      description: 'Get instant help or book a session',
      icon: BookOpen,
      href: '/schedule-tutor',
      color: 'bg-blue-500 hover:bg-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Tech Box',
      description: 'Access project guidance',
      icon: Code,
      href: '/tech-box',
      color: 'bg-green-500 hover:bg-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Browse Events',
      description: 'Join workshops & hackathons',
      icon: Calendar,
      href: '/events',
      color: 'bg-purple-500 hover:bg-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Become a Tutor',
      description: 'Share your knowledge',
      icon: Users,
      href: '/become-tutor',
      color: 'bg-orange-500 hover:bg-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      type: 'session',
      title: 'Mathematics Tutoring Session',
      status: 'completed',
      time: '2 hours ago',
      tutor: 'Dr. Sarah Johnson'
    },
    {
      type: 'project',
      title: 'React Project - E-commerce App',
      status: 'in-progress',
      time: '1 day ago',
      progress: 75
    },
    {
      type: 'event',
      title: 'Web Development Workshop',
      status: 'registered',
      time: 'Tomorrow 2:00 PM',
      location: 'Online'
    }
  ];

  const stats = [
    {
      label: 'Sessions Completed',
      value: myLeads.filter(l => l.status === 'resolved').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
      change: '+12%'
    },
    {
      label: 'Active Requests',
      value: myLeads.filter(l => ['open', 'assigned', 'in_progress'].includes(l.status)).length,
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: '+5%'
    },
    {
      label: 'Events Registered',
      value: myRegistrations.length,
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: '+8%'
    },
    {
      label: 'Learning Score',
      value: '4.8',
      icon: Star,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      change: '+0.2'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton className="mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userProfile?.displayName || 'Student'}!
              </h1>
              <p className="text-gray-600 mt-2">
                Continue your learning journey with Doutly
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{myLeads.length}</div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{myLeads.filter(l => l.status === 'resolved').length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change} this month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
                      <action.icon className={`h-6 w-6 ${action.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>

            {/* My Requests */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">My Requests</h2>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading requests...</p>
                  </div>
                ) : myLeads.length === 0 ? (
                  <div className="p-6 text-center">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No requests yet</p>
                    <Link 
                      to="/schedule-tutor"
                      className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Schedule Your First Session
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {myLeads.slice(0, 5).map((lead) => (
                      <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-mono text-sm font-medium text-blue-600">
                                {lead.ticketNumber}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                {lead.status.replace('_', ' ')}
                              </span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-1">{lead.subject}</h3>
                            <p className="text-sm text-gray-600">
                              Created {new Date(lead.createdAt?.toDate?.() || lead.createdAt).toLocaleDateString()}
                            </p>
                            {lead.assignedTo && (
                              <p className="text-xs text-blue-600 mt-1">
                                Assigned to: {lead.assignedTo}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">{userProfile?.displayName}</h4>
                <p className="text-sm text-gray-600 mb-2">{userProfile?.role === 'student' ? 'Student' : 'Freelancer'}</p>
                {userProfile?.institution && (
                  <p className="text-xs text-gray-500">{userProfile.institution}</p>
                )}
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{myLeads.filter(l => l.status === 'resolved').length}</div>
                    <div className="text-xs text-gray-600">Completed</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">4.8</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 last:pb-0 border-b last:border-b-0 border-gray-100">
                    <div className="flex-shrink-0">
                      {activity.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {activity.status === 'in-progress' && (
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                      )}
                      {activity.status === 'registered' && (
                        <Calendar className="h-5 w-5 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                      {activity.tutor && (
                        <p className="text-xs text-gray-600 mt-1">
                          with {activity.tutor}
                        </p>
                      )}
                      {activity.progress && (
                        <div className="mt-2">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${activity.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {activity.progress}% complete
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Registrations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Event Registrations</h3>
              {myRegistrations.length === 0 ? (
                <div className="text-center py-4">
                  <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">No events registered</p>
                  <Link 
                    to="/events"
                    className="inline-flex items-center mt-2 text-blue-600 text-sm hover:text-blue-700"
                  >
                    Browse Events
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {myRegistrations.slice(0, 3).map((registration) => (
                    <div key={registration.id} className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 text-sm">{registration.eventTitle}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600">{registration.eventType}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                          {registration.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;