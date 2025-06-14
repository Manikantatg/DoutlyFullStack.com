import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Lightbulb, 
  Calendar,
  CheckCircle,
  Star,
  GraduationCap,
  Code,
  UserCheck,
  Building,
  TrendingUp,
  Globe,
  Briefcase,
  Award,
  Target,
  Zap,
  Heart,
  Coffee,
  Shield,
  Rocket,
  Brain,
  Compass,
  Sparkles
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Schedule a Tutor',
      description: 'Get instant help or schedule sessions with expert tutors for your academic doubts.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: Code,
      title: 'Tech Box',
      description: 'Access project guidance, custom solutions, and technical mentorship for your ideas.',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: Calendar,
      title: 'Events Portal',
      description: 'Join workshops, hackathons, and educational events from top institutions.',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: UserCheck,
      title: 'Turn to Tutor',
      description: 'Transform your expertise into income by becoming a tutor on our platform.',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  const userTypes = [
    {
      icon: GraduationCap,
      title: 'Students',
      subtitle: 'Learn & Earn',
      description: 'Get expert guidance, solve doubts instantly, and access quality educational resources.',
      benefits: ['Instant doubt resolution', '24/7 tutor availability', 'Project guidance', 'Skill development']
    },
    {
      icon: Users,
      title: 'Freelancers',
      subtitle: 'Work Smart, Not Hard',
      description: 'Leverage your skills to help students while building a sustainable income stream.',
      benefits: ['Flexible working hours', 'Multiple income streams', 'Skill monetization', 'Professional growth']
    },
    {
      icon: Building,
      title: 'Institutions',
      subtitle: 'Scale & Connect',
      description: 'Partner with us to extend your educational reach and impact more students.',
      benefits: ['Expanded reach', 'Event hosting', 'Student engagement', 'Brand visibility']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science Student',
      content: 'Doutly helped me understand complex algorithms through personalized tutoring. The instant doubt resolution feature is a game-changer!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Freelance Developer',
      content: 'As a tutor on Doutly, I\'ve been able to share my knowledge while earning a steady income. The platform makes it easy to connect with students.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'University Professor',
      content: 'Our institution has partnered with Doutly to host virtual workshops. The engagement and reach have exceeded our expectations.',
      rating: 5
    }
  ];

  const events = [
    {
      title: 'Web Development Bootcamp',
      date: 'Dec 15, 2024',
      type: 'Workshop',
      institution: 'Tech University',
      attendees: 150
    },
    {
      title: 'AI/ML Hackathon',
      date: 'Dec 20, 2024',
      type: 'Competition',
      institution: 'Innovation Hub',
      attendees: 300
    },
    {
      title: 'Career Fair 2024',
      date: 'Dec 25, 2024',
      type: 'Networking',
      institution: 'Multiple Partners',
      attendees: 500
    }
  ];

  const careers = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Hybrid',
      type: 'Full-time'
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Contract'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Enhanced Animations */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 pb-24 overflow-hidden">
        {/* Enhanced Floating SVG Animations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Primary floating elements */}
          <div className="absolute top-20 left-10 animate-bounce">
            <GraduationCap className="h-8 w-8 text-blue-300 opacity-60" />
          </div>
          <div className="absolute top-32 right-20 animate-pulse">
            <Code className="h-6 w-6 text-green-300 opacity-60" />
          </div>
          <div className="absolute bottom-32 left-20 animate-bounce delay-300">
            <BookOpen className="h-7 w-7 text-purple-300 opacity-60" />
          </div>
          <div className="absolute top-40 left-1/2 animate-pulse delay-500">
            <Lightbulb className="h-5 w-5 text-yellow-300 opacity-60" />
          </div>
          <div className="absolute bottom-40 right-10 animate-bounce delay-700">
            <Users className="h-6 w-6 text-indigo-300 opacity-60" />
          </div>
          <div className="absolute top-60 right-1/3 animate-pulse delay-1000">
            <Target className="h-4 w-4 text-pink-300 opacity-60" />
          </div>
          
          {/* Additional floating elements */}
          <div className="absolute top-16 left-1/4 animate-bounce delay-1200">
            <Rocket className="h-5 w-5 text-red-300 opacity-50" />
          </div>
          <div className="absolute bottom-16 right-1/4 animate-pulse delay-1400">
            <Brain className="h-6 w-6 text-teal-300 opacity-50" />
          </div>
          <div className="absolute top-80 left-16 animate-bounce delay-1600">
            <Zap className="h-4 w-4 text-orange-300 opacity-50" />
          </div>
          <div className="absolute bottom-80 right-16 animate-pulse delay-1800">
            <Heart className="h-5 w-5 text-rose-300 opacity-50" />
          </div>
          <div className="absolute top-96 right-12 animate-bounce delay-2000">
            <Coffee className="h-4 w-4 text-amber-300 opacity-50" />
          </div>
          <div className="absolute bottom-96 left-12 animate-pulse delay-2200">
            <Shield className="h-5 w-5 text-emerald-300 opacity-50" />
          </div>
          <div className="absolute top-48 left-3/4 animate-bounce delay-2400">
            <Compass className="h-4 w-4 text-violet-300 opacity-50" />
          </div>
          <div className="absolute bottom-48 right-3/4 animate-pulse delay-2600">
            <Sparkles className="h-5 w-5 text-cyan-300 opacity-50" />
          </div>
          <div className="absolute top-24 right-1/2 animate-bounce delay-2800">
            <Award className="h-4 w-4 text-lime-300 opacity-50" />
          </div>
          <div className="absolute bottom-24 left-1/2 animate-pulse delay-3000">
            <Globe className="h-5 w-5 text-sky-300 opacity-50" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight animate-fade-in-up">
                Education
                <span className="text-blue-600 animate-gradient-text"> Reimagined</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                Connecting students, freelancers, and institutions through quality education, 
                mentorship, and professional growth opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
              <Link 
                to="/signup?role=student"
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span>Get Started as Student</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/signup?role=freelancer"
                className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-1 hover:scale-105"
              >
                <span>Join as Freelancer</span>
                <Users className="h-5 w-5" />
              </Link>
            </div>

            <div className="pt-8 animate-fade-in-up delay-600">
              <div className="flex justify-center items-center space-x-8 text-gray-500 text-sm">
                <div className="flex items-center space-x-2 animate-counter">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>10,000+ Students</span>
                </div>
                <div className="flex items-center space-x-2 animate-counter delay-200">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>1,000+ Tutors</span>
                </div>
                <div className="flex items-center space-x-2 animate-counter delay-400">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>500+ Institutions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Doutly Section with Floating Elements */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Floating elements for this section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-8 animate-float">
            <BookOpen className="h-6 w-6 text-blue-200 opacity-40" />
          </div>
          <div className="absolute bottom-20 right-8 animate-float delay-1000">
            <Users className="h-7 w-7 text-purple-200 opacity-40" />
          </div>
          <div className="absolute top-1/2 left-12 animate-float delay-2000">
            <Target className="h-5 w-5 text-green-200 opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in-up">
              What is <span className="text-blue-600">Doutly?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              A comprehensive platform that bridges the gap between students seeking knowledge, 
              freelancers sharing expertise, and institutions expanding their reach.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <type.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{type.title}</h3>
                      <p className="text-blue-600 font-semibold">{type.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">{type.description}</p>
                  
                  <div className="space-y-2">
                    {type.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Floating Elements */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-16 animate-float">
            <Code className="h-8 w-8 text-green-200 opacity-40" />
          </div>
          <div className="absolute bottom-16 left-16 animate-float delay-1500">
            <Calendar className="h-6 w-6 text-purple-200 opacity-40" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float delay-3000">
            <Lightbulb className="h-5 w-5 text-yellow-200 opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in-up">
              Core <span className="text-blue-600">Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Everything you need to succeed in your educational and professional journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section with Floating Elements */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-20 animate-float">
            <Calendar className="h-7 w-7 text-blue-200 opacity-40" />
          </div>
          <div className="absolute bottom-24 right-20 animate-float delay-2000">
            <Award className="h-6 w-6 text-orange-200 opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in-up">
              Upcoming <span className="text-blue-600">Events</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Join workshops, hackathons, and networking events hosted by top institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                    <span className="text-gray-500 text-sm">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <p className="text-gray-600">Hosted by {event.institution}</p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                    <Link 
                      to="/events"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors transform hover:scale-105"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/events"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors transform hover:-translate-y-1 animate-fade-in-up delay-600"
            >
              View All Events
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Careers Section with Floating Elements */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-24 animate-float">
            <Briefcase className="h-6 w-6 text-purple-200 opacity-40" />
          </div>
          <div className="absolute bottom-20 right-24 animate-float delay-1000">
            <TrendingUp className="h-7 w-7 text-green-200 opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in-up">
              Join Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Be part of the revolution in education technology. We're looking for passionate individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careers.map((job, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>{job.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <Link 
                    to="/careers"
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/careers"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors transform hover:-translate-y-1 animate-fade-in-up delay-600"
            >
              View All Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials with Floating Elements */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-32 right-32 animate-float">
            <Star className="h-6 w-6 text-yellow-200 opacity-40" />
          </div>
          <div className="absolute bottom-32 left-32 animate-float delay-1500">
            <Heart className="h-5 w-5 text-rose-200 opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 animate-fade-in-up">
              Success <span className="text-blue-600">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Hear from our community of students, tutors, and institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg space-y-4 transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{animationDelay: `${index * 200}ms`}}>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-16 animate-float">
            <Building className="h-8 w-8 text-purple-200 opacity-40" />
          </div>
          <div className="absolute bottom-16 right-16 animate-float delay-2000">
            <Globe className="h-7 w-7 text-blue-200 opacity-40" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-center animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">Want to Host an Event?</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Partner with Doutly to reach thousands of students and professionals. 
              Host workshops, competitions, and networking events on our platform.
            </p>
            <Link 
              to="/become-partner"
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors transform hover:-translate-y-1 inline-block"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Final Floating Elements */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-12 left-12 animate-float">
            <Rocket className="h-8 w-8 text-white opacity-20" />
          </div>
          <div className="absolute bottom-12 right-12 animate-float delay-1000">
            <Sparkles className="h-7 w-7 text-white opacity-20" />
          </div>
          <div className="absolute top-1/2 left-1/4 animate-float delay-2000">
            <Zap className="h-6 w-6 text-white opacity-20" />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-float delay-3000">
            <Target className="h-5 w-5 text-white opacity-20" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white animate-fade-in-up">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Join thousands of students and educators who are already part of the Doutly community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
              <Link 
                to="/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg transform hover:-translate-y-1"
              >
                Join Doutly Today
              </Link>
              <Link 
                to="/schedule-tutor"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors transform hover:-translate-y-1"
              >
                Schedule a Session
              </Link>
              <Link 
                to="/become-tutor"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors transform hover:-translate-y-1"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-text {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes counter {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-fade-in-up.delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-fade-in-up.delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-gradient-text {
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-text 3s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float.delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-float.delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animate-float.delay-2000 {
          animation-delay: 2s;
        }
        
        .animate-float.delay-3000 {
          animation-delay: 3s;
        }
        
        .animate-counter {
          animation: counter 0.6s ease-out;
        }
        
        .animate-counter.delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .animate-counter.delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;