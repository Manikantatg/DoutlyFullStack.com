import React, { useState } from 'react';
import { Calendar, Clock, User, BookOpen, Send } from 'lucide-react';
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/BackButton';

const ScheduleTutor: React.FC = () => {
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState({
    doubtDescription: '',
    subject: '',
    tutorType: 'instant',
    scheduledDate: '',
    scheduledTime: '',
    urgencyLevel: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Programming', 'Web Development', 'Data Science', 'Machine Learning',
    'English', 'History', 'Economics', 'Other'
  ];

  const generateTicketNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TKT-${timestamp}-${random}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    setLoading(true);

    try {
      const newTicketNumber = generateTicketNumber();
      
      const leadData = {
        ticketNumber: newTicketNumber,
        type: 'tutor_request',
        studentId: userProfile.uid,
        studentName: userProfile.displayName,
        studentEmail: userProfile.email,
        doubtDescription: formData.doubtDescription,
        subject: formData.subject,
        tutorType: formData.tutorType,
        scheduledDate: formData.scheduledDate || null,
        scheduledTime: formData.scheduledTime || null,
        urgencyLevel: formData.urgencyLevel,
        status: 'open',
        priority: formData.urgencyLevel === 'urgent' ? 'high' : formData.urgencyLevel === 'high' ? 'medium' : 'low',
        createdAt: new Date(),
        updatedAt: new Date(),
        assignedTo: null,
        assignedBy: null,
        notes: [],
        history: [{
          action: 'created',
          timestamp: new Date(),
          by: userProfile.displayName,
          note: 'Ticket created by student'
        }]
      };

      // Add lead to leads collection
      await addDoc(collection(db, 'leads'), leadData);
      
      // Update user profile with ticket number
      if (userProfile.uid) {
        await updateDoc(doc(db, 'users', userProfile.uid), {
          ticketNumbers: arrayUnion(newTicketNumber)
        });
      }

      setTicketNumber(newTicketNumber);
      setSuccess(true);
      
      // Reset form
      setFormData({
        doubtDescription: '',
        subject: '',
        tutorType: 'instant',
        scheduledDate: '',
        scheduledTime: '',
        urgencyLevel: 'medium'
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton className="mb-4" />
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Schedule a Tutor</h1>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Get personalized help from expert tutors. Choose between instant support or schedule a session at your convenience.
            </p>
          </div>
        </div>

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Send className="h-5 w-5" />
              <span className="font-medium">Request submitted successfully!</span>
            </div>
            <p className="mt-1 text-sm">
              Your ticket number is: <span className="font-bold">{ticketNumber}</span>
            </p>
            <p className="mt-1 text-sm">We'll connect you with a tutor shortly. Check your email for updates.</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Doubt Description */}
            <div>
              <label htmlFor="doubtDescription" className="block text-sm font-semibold text-gray-900 mb-2">
                Describe Your Doubt or Question *
              </label>
              <textarea
                id="doubtDescription"
                name="doubtDescription"
                value={formData.doubtDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Please provide a detailed description of what you need help with..."
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                The more details you provide, the better we can match you with the right tutor.
              </p>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Tutor Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                How would you like to connect? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    name="tutorType"
                    value="instant"
                    checked={formData.tutorType === 'instant'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.tutorType === 'instant' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Clock className={`h-6 w-6 ${
                        formData.tutorType === 'instant' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-gray-900">Instant Help</h3>
                        <p className="text-sm text-gray-600">Connect with available tutors now</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative">
                  <input
                    type="radio"
                    name="tutorType"
                    value="scheduled"
                    checked={formData.tutorType === 'scheduled'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.tutorType === 'scheduled' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Calendar className={`h-6 w-6 ${
                        formData.tutorType === 'scheduled' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-gray-900">Schedule Session</h3>
                        <p className="text-sm text-gray-600">Book for a specific time</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Schedule Details (if scheduled) */}
            {formData.tutorType === 'scheduled' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                <div>
                  <label htmlFor="scheduledDate" className="block text-sm font-semibold text-gray-900 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="scheduledDate"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={formData.tutorType === 'scheduled'}
                  />
                </div>
                <div>
                  <label htmlFor="scheduledTime" className="block text-sm font-semibold text-gray-900 mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="time"
                    id="scheduledTime"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required={formData.tutorType === 'scheduled'}
                  />
                </div>
              </div>
            )}

            {/* Urgency Level */}
            <div>
              <label htmlFor="urgencyLevel" className="block text-sm font-semibold text-gray-900 mb-2">
                Urgency Level
              </label>
              <select
                id="urgencyLevel"
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low - Can wait a few days</option>
                <option value="medium">Medium - Need help within 24 hours</option>
                <option value="high">High - Need help today</option>
                <option value="urgent">Urgent - Need help immediately</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Submit Tutor Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <User className="h-6 w-6 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Expert Tutors</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Our tutors are verified experts with proven track records in their subjects.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="h-6 w-6 text-green-600" />
              <h3 className="font-semibold text-gray-900">Quick Response</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get connected with tutors within minutes for instant help or scheduled sessions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Personalized Learning</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Every session is tailored to your specific needs and learning style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTutor;