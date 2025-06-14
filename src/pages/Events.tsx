import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Filter,
  Search,
  ExternalLink,
  Star,
  Tag
} from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/BackButton';

const Events: React.FC = () => {
  const { userProfile } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [registrationData, setRegistrationData] = useState({
    name: userProfile?.displayName || '',
    email: userProfile?.email || '',
    phone: userProfile?.phone || '',
    institution: userProfile?.institution || '',
    additionalInfo: ''
  });

  const events = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      description: 'Learn modern web development with React, Node.js, and MongoDB. Perfect for beginners and intermediate developers.',
      date: '2024-12-15',
      time: '10:00 AM',
      duration: '6 hours',
      type: 'Workshop',
      category: 'Technology',
      institution: 'Tech University',
      location: 'Online',
      attendees: 150,
      maxAttendees: 200,
      price: 'Free',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'Node.js', 'MongoDB', 'JavaScript']
    },
    {
      id: 2,
      title: 'AI/ML Hackathon 2024',
      description: 'Build innovative AI solutions in 48 hours. Win prizes and network with industry experts.',
      date: '2024-12-20',
      time: '9:00 AM',
      duration: '48 hours',
      type: 'Competition',
      category: 'Artificial Intelligence',
      institution: 'Innovation Hub',
      location: 'Hybrid',
      attendees: 300,
      maxAttendees: 500,
      price: '$25',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['AI', 'Machine Learning', 'Python', 'TensorFlow']
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      description: 'Connect with top employers and explore career opportunities in tech, finance, and consulting.',
      date: '2024-12-25',
      time: '11:00 AM',
      duration: '4 hours',
      type: 'Networking',
      category: 'Career',
      institution: 'Multiple Partners',
      location: 'Convention Center',
      attendees: 500,
      maxAttendees: 1000,
      price: 'Free',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Networking', 'Jobs', 'Career', 'Recruitment']
    },
    {
      id: 4,
      title: 'Data Science Workshop',
      description: 'Master data analysis, visualization, and machine learning with hands-on projects.',
      date: '2024-12-28',
      time: '2:00 PM',
      duration: '5 hours',
      type: 'Workshop',
      category: 'Data Science',
      institution: 'Data Institute',
      location: 'Online',
      attendees: 120,
      maxAttendees: 150,
      price: '$50',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Python', 'Pandas', 'Visualization', 'Statistics']
    },
    {
      id: 5,
      title: 'Startup Pitch Competition',
      description: 'Present your startup idea to investors and win funding opportunities.',
      date: '2024-12-30',
      time: '3:00 PM',
      duration: '3 hours',
      type: 'Competition',
      category: 'Entrepreneurship',
      institution: 'Startup Incubator',
      location: 'Business Center',
      attendees: 80,
      maxAttendees: 100,
      price: '$15',
      rating: 4.5,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Startup', 'Pitch', 'Investment', 'Business']
    },
    {
      id: 6,
      title: 'Cybersecurity Fundamentals',
      description: 'Learn essential cybersecurity concepts and protect yourself and your organization.',
      date: '2025-01-05',
      time: '1:00 PM',
      duration: '4 hours',
      type: 'Workshop',
      category: 'Security',
      institution: 'Security Academy',
      location: 'Online',
      attendees: 200,
      maxAttendees: 250,
      price: '$30',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Security', 'Networking', 'Ethical Hacking', 'Privacy']
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRegister = (event: any) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const registrationDoc = {
        ...registrationData,
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventType: selectedEvent.type,
        registrationDate: new Date(),
        status: 'pending'
      };

      await addDoc(collection(db, 'event_registrations'), registrationDoc);
      
      setShowRegistrationForm(false);
      setSelectedEvent(null);
      setRegistrationData({
        name: userProfile?.displayName || '',
        email: userProfile?.email || '',
        phone: userProfile?.phone || '',
        institution: userProfile?.institution || '',
        additionalInfo: ''
      });
      
      alert('Registration submitted successfully! You will receive a confirmation email shortly.');
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Error submitting registration. Please try again.');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'workshop': return 'bg-blue-100 text-blue-800';
      case 'competition': return 'bg-red-100 text-red-800';
      case 'networking': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton className="mb-4" />
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join workshops, hackathons, and networking events hosted by top institutions and industry experts.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="workshop">Workshops</option>
                <option value="competition">Competitions</option>
                <option value="networking">Networking</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-lg px-2 py-1">
                  <span className="text-sm font-semibold text-gray-900">{event.price}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">{event.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{event.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{event.time} • {event.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees}/{event.maxAttendees} registered</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                  {event.tags.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      +{event.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Hosted by</p>
                    <p className="text-sm font-medium text-gray-900">{event.institution}</p>
                  </div>
                  <button 
                    onClick={() => handleRegister(event)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <span>Register</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Registration Form Modal */}
        {showRegistrationForm && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Register for Event</h3>
                  <button
                    onClick={() => setShowRegistrationForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{selectedEvent.title}</p>
              </div>
              <form onSubmit={handleRegistrationSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={registrationData.phone}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution/Organization</label>
                  <input
                    type="text"
                    value={registrationData.institution}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, institution: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    value={registrationData.additionalInfo}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special requirements or questions..."
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRegistrationForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Host an Event?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Partner with Doutly to reach thousands of students and professionals. 
            Host workshops, competitions, and networking events on our platform.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            Become a Partner
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;