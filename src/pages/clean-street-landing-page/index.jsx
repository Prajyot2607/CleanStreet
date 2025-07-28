import React from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/ui/Header';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import RecentActivity from './components/RecentActivity';

const CleanStreetLandingPage = () => {

  // Mock features data
  const features = [
    {
      id: 1,
      title: "Easy Reporting",
      description: "Report issues in your neighborhood with just a few clicks. Upload photos and provide detailed descriptions.",
      icon: "Camera",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Real-time Tracking",
      description: "Track the progress of your reported issues from submission to resolution with live updates.",
      icon: "MapPin",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Community Impact",
      description: "See how your contributions are making a difference in your community with detailed analytics.",
      icon: "TrendingUp",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header isAuthenticated={false} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Make Your
                <span className="block text-yellow-300">Neighborhood</span>
                Better
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
                Report community issues, track their progress, and help create cleaner, safer streets for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              
                <Link to="/login">
                  <Button
                  size="large"
                  className="bg-green-100 text-primary hover:bg-gray-100 font-semibold"
                  icon="Plus"
                >
                  Report an Issue
                </Button>
                </Link>
                <Link to="/about-us">
                <Button
                  variant="secondary"
                  size="large"
                  className="border-white text-green-100 hover:bg-white hover:text-primary"
                  icon="Play"
                >
                  Learn More
                </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop"
                  alt="Community members working together"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-white bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              How CleanStreet Works
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Our platform makes it simple for citizens to report issues and track their resolution, creating stronger communities together.
            </p>
          </div>

          <div className="space-y-20">
            {features.map((feature, index) => (
              <div key={feature.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary bg-opacity-10 rounded-lg mr-4">
                      <Icon name={feature.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-primary">{feature.title}</h3>
                  </div>
                  <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                {/* <Link to="/about-us">
                  <Button icon="ArrowRight" iconPosition="right">
                    Learn More
                  </Button>
                  </Link> */}
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      className="rounded-lg shadow-lg w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-primary bg-opacity-10 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <RecentActivity />

     

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Icon name="MapPin" size={32} className="text-primary mr-2" />
                <span className="text-2xl font-bold">CleanStreet</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering communities to create cleaner, safer neighborhoods through collaborative issue reporting and resolution.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Facebook" size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Twitter" size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Linkedin" size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Report Issue</Link></li>
                <li><Link to="/feedback" className="text-gray-300 hover:text-white transition-colors">Feedback</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} CleanStreet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CleanStreetLandingPage;