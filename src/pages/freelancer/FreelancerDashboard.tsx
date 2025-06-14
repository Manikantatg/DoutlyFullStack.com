import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Clock, 
  Star, 
  TrendingUp,
  BookOpen,
  Users,
  Calendar,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import BackButton from '../../components/BackButton';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'available' | 'in_progress' | 'completed';
  budget: number;
  deadline: string;
  skills: string[];
  client: string;
}

const FreelancerDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'E-commerce Website Development',
      description: 'Build a modern e-commerce platform with React and Node.js',
      status: 'available',
      budget: 2500,
      deadline: '2024-01-15',
      skills: ['React', 'Node.js', 'MongoDB'],
      client: 'TechStart Inc.'
    },
    {
      id: '2',
      title: 'Mobile App UI/UX Design',
      description: 'Design user interface for a fitness tracking mobile application',
      status: 'in_progress',
      budget: 1800,
      deadline: '2024-01-10',
      skills: ['UI/UX', 'Figma', 'Mobile Design'],
      client: 'FitLife Solutions'
    },
    {
      id: '3',
      title: 'Data Analysis Dashboard',
      description: 'Create interactive dashboard for sales data visualization',
      status: 'completed',
      budget: 3200,
      deadline: '2023-12-20',
      skills: ['Python', 'Data Analysis', 'Tableau'],
      client: 'DataCorp Ltd.'
    }
  ];

  useEffect(() => {
    // In a real implementation, you would fetch projects from Firebase
    setProjects(mockProjects);
    setLoading(false);
  }, []);

  const stats = [
    {
      label: 'Total Earnings',
      value: '$12,450',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      label: 'Active Projects',
      value: '3',
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      label: 'Completed Projects',
      value: '18',
      icon: CheckCircle,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      label: 'Client Rating',
      value: '4.9',
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    }
  ];

  const recentActivities = [
    {
      type: 'project_completed',
      title: 'Data Analysis Dashboard completed',
      time: '2 hours ago',
      amount: '$3,200'
    },
    {
      type: 'project_started',
      title: 'Started Mobile App UI/UX Design',
      time: '1 day ago',
      amount: '$1,800'
    },
    {
      type: 'payment_received',
      title: 'Payment received from TechStart Inc.',
      time: '3 days ago',
      amount: '$2,500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton className="mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.displayName || 'Freelancer'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your projects and grow your freelance business
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Projects */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Available Projects</h2>
              </div>
              <div className="p-6 space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading projects...</p>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                          <p className="text-sm text-gray-500">Client: {project.client}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${project.budget.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(project.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                          {project.skills.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              +{project.skills.length - 3} more
                            </span>
                          )}
                        </div>
                        {project.status === 'available' && (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                            Apply Now
                          </button>
                        )}
                      </div>
                    </div>
                  ))
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
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">{userProfile?.displayName}</h4>
                <p className="text-sm text-gray-600 mb-2">Full Stack Developer</p>
                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">4.9</span>
                  <span className="text-sm text-gray-600">(47 reviews)</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Success Rate: <span className="font-medium text-green-600">96%</span></p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === 'project_completed' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {activity.type === 'project_started' && (
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      )}
                      {activity.type === 'payment_received' && (
                        <DollarSign className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <p className="text-sm font-medium text-green-600">{activity.amount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills</h3>
              <div className="space-y-3">
                {userProfile?.skills?.slice(0, 5).map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{skill}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">Expert</span>
                    </div>
                  </div>
                )) || (
                  <p className="text-sm text-gray-500">No skills added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;