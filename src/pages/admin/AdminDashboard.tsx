import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  UserPlus,
  Settings,
  BarChart3,
  Filter,
  Search,
  Eye,
  UserCheck,
  ArrowRight,
  FileText,
  Award,
  Building,
  DollarSign,
  Target,
  Calendar,
  Mail,
  Phone,
  Globe,
  Download,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot, orderBy, updateDoc, doc, where, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import BackButton from '../../components/BackButton';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Lead {
  id: string;
  ticketNumber: string;
  type: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  urgencyLevel: string;
  createdAt: any;
  assignedTo?: string;
  assignedBy?: string;
  doubtDescription: string;
}

interface Application {
  id: string;
  type: 'tutor_application' | 'partnership_application';
  name?: string;
  organizationName?: string;
  email: string;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: any;
  skills?: string[];
  experience?: string;
  hourlyRate?: string;
  bio?: string;
  partnershipType?: string;
  eventType?: string;
  targetAudience?: string;
  estimatedAttendees?: string;
  message?: string;
}

interface EventRegistration {
  id: string;
  name: string;
  email: string;
  phone?: string;
  eventTitle: string;
  eventType: string;
  registrationDate: any;
  status: 'pending' | 'approved' | 'rejected';
  institution?: string;
  additionalInfo?: string;
}

interface TeamMember {
  id?: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinedDate: Date;
}

const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'tutor'
  });

  // Mock team members with Indian names
  const mockTeamMembers: TeamMember[] = [
    { id: '1', name: 'Rajesh Kumar', role: 'vertical_head', email: 'rajesh.vh@doutly.com', status: 'active', joinedDate: new Date('2024-01-15') },
    { id: '2', name: 'Priya Sharma', role: 'manager', email: 'priya.manager@doutly.com', status: 'active', joinedDate: new Date('2024-02-20') },
    { id: '3', name: 'Amit Patel', role: 'team_leader', email: 'amit.tl@doutly.com', status: 'active', joinedDate: new Date('2024-03-10') },
    { id: '4', name: 'Sneha Reddy', role: 'tutor', email: 'sneha.tutor@doutly.com', status: 'active', joinedDate: new Date('2024-04-05') },
    { id: '5', name: 'Vikram Singh', role: 'bda', email: 'vikram.bda@doutly.com', status: 'active', joinedDate: new Date('2024-05-12') },
    { id: '6', name: 'Ananya Gupta', role: 'sales', email: 'ananya.sales@doutly.com', status: 'active', joinedDate: new Date('2024-06-18') }
  ];

  useEffect(() => {
    // Fetch leads
    const leadsQuery = query(
      collection(db, 'leads'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      
      setLeads(leadsData);
      setLoading(false);
    });

    // Fetch applications
    const applicationsQuery = query(
      collection(db, 'applications'),
      orderBy('submittedAt', 'desc')
    );

    const unsubscribeApplications = onSnapshot(applicationsQuery, (snapshot) => {
      const applicationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Application[];
      
      setApplications(applicationsData);
    });

    // Fetch event registrations
    const registrationsQuery = query(
      collection(db, 'event_registrations'),
      orderBy('registrationDate', 'desc')
    );

    const unsubscribeRegistrations = onSnapshot(registrationsQuery, (snapshot) => {
      const registrationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EventRegistration[];
      
      setEventRegistrations(registrationsData);
    });

    // Set mock team members
    setTeamMembers(mockTeamMembers);

    return () => {
      unsubscribeLeads();
      unsubscribeApplications();
      unsubscribeRegistrations();
    };
  }, []);

  useEffect(() => {
    let filtered = leads;

    if (filter !== 'all') {
      filtered = filtered.filter(lead => lead.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  }, [leads, filter, searchTerm]);

  const handleBulkAssign = async (assignTo: string) => {
    try {
      const promises = selectedItems.map(leadId => 
        updateDoc(doc(db, 'leads', leadId), {
          assignedTo: assignTo,
          assignedBy: userProfile?.displayName,
          status: 'assigned',
          updatedAt: new Date()
        })
      );
      
      await Promise.all(promises);
      setSelectedItems([]);
    } catch (error) {
      console.error('Error bulk assigning leads:', error);
    }
  };

  const handleApplicationAction = async (applicationId: string, action: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'applications', applicationId), {
        status: action,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    try {
      await deleteDoc(doc(db, 'applications', applicationId));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleAddTeamMember = async () => {
    try {
      const memberData = {
        ...newMember,
        status: 'active',
        joinedDate: new Date()
      };
      
      await addDoc(collection(db, 'team_members'), memberData);
      
      setTeamMembers(prev => [...prev, { ...memberData, id: Date.now().toString() }]);
      setNewMember({ name: '', email: '', role: 'tutor' });
      setShowAddMemberModal(false);
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleExportAnalytics = () => {
    const data = {
      totalLeads: leads.length,
      applications: applications.length,
      eventRegistrations: eventRegistrations.length,
      teamMembers: teamMembers.length,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doutly-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectItem = (leadId: string) => {
    setSelectedItems(prev => 
      prev.includes(leadId) 
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredLeads.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredLeads.map(lead => lead.id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'assigned': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Chart data
  const leadsOverTimeData = leads.reduce((acc, lead) => {
    const date = new Date(lead.createdAt?.toDate?.() || lead.createdAt).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.leads += 1;
    } else {
      acc.push({ date, leads: 1 });
    }
    return acc;
  }, [] as { date: string; leads: number }[]).slice(-7);

  const statusDistributionData = [
    { name: 'Open', value: leads.filter(l => l.status === 'open').length, color: '#ef4444' },
    { name: 'Assigned', value: leads.filter(l => l.status === 'assigned').length, color: '#f59e0b' },
    { name: 'In Progress', value: leads.filter(l => l.status === 'in_progress').length, color: '#3b82f6' },
    { name: 'Resolved', value: leads.filter(l => l.status === 'resolved').length, color: '#10b981' },
    { name: 'Closed', value: leads.filter(l => l.status === 'closed').length, color: '#6b7280' }
  ];

  const applicationTypeData = [
    { name: 'Tutor Applications', value: applications.filter(a => a.type === 'tutor_application').length },
    { name: 'Partnership Applications', value: applications.filter(a => a.type === 'partnership_application').length }
  ];

  const stats = [
    {
      label: 'Total Leads',
      value: leads.length,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: '+12%'
    },
    {
      label: 'Applications',
      value: applications.length,
      icon: FileText,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: '+8%'
    },
    {
      label: 'Event Registrations',
      value: eventRegistrations.length,
      icon: Calendar,
      color: 'text-green-600',
      bg: 'bg-green-100',
      change: '+15%'
    },
    {
      label: 'Team Members',
      value: teamMembers.length,
      icon: Users,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      change: '+5%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton className="mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Comprehensive platform management and analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddMemberModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Add Team Member</span>
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'leads', label: 'Lead Management', icon: Users },
                { id: 'applications', label: 'Applications', icon: FileText },
                { id: 'registrations', label: 'Event Registrations', icon: Calendar },
                { id: 'team', label: 'Team Management', icon: UserCheck },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Charts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={leadsOverTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistributionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Types</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={applicationTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowAddMemberModal(true)}
                  className="w-full flex items-center justify-between p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Add Team Member</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-600" />
                </button>
                <Link 
                  to="/admin/registrations"
                  className="w-full flex items-center justify-between p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Manage Registrations</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-600" />
                </Link>
                <button 
                  onClick={handleExportAnalytics}
                  className="w-full flex items-center justify-between p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Export Analytics</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-green-600" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">System Settings</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-orange-600" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Team Management</h2>
                <button 
                  onClick={() => setShowAddMemberModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Member</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {member.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.joinedDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Team Member Modal */}
        {showAddMemberModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Add Team Member</h3>
                  <button
                    onClick={() => setShowAddMemberModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@doutly.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="tutor">Tutor</option>
                    <option value="team_leader">Team Leader</option>
                    <option value="manager">Manager</option>
                    <option value="vertical_head">Vertical Head</option>
                    <option value="bda">BDA</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTeamMember}
                    disabled={!newMember.name || !newMember.email}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;