// src/pages/about-us/index.jsx
import React from 'react';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import ashwinImg from './images/ashwin.jpg';
import prajyotImg from './images/prajyot.jpg';
import sanikaImg from './images/sanika.jpg';



const AboutUs = () => {
  // Mission, vision, and impact data
  const missionData = {
    mission: "To empower communities by providing a digital platform that connects citizens with local authorities, making it easier to report, track, and resolve neighborhood issues collaboratively.",
    vision: "A world where every community member has a voice in shaping their neighborhood, creating cleaner, safer, and more vibrant places to live."
  };


  // Team members data - Updated to 3 members including user
  const teamMembers = [
    {
      name: "Ashwin Ghute",
      role: "Developer",
      description: "Ashwin is a recent B.Tech graduate and a student at CDAC Mumbai, passionate about software development and emerging technologies. He is eager to apply his skills to real-world projects and contribute in the tech industry.",
      image: ashwinImg
    },
    {
      name: "Sanika Karade",
      role: "Developer",
      description: "Sanika is a B.Tech graduate and a student at CDAC Mumbai. With a strong foundation in programming and problem-solving, she building innovative tech solutions and launching her career in software development.",
      image: sanikaImg
    },
    {
      name: "Prajyot Nimsarkar",
      role: "Developer",
      description: "Prajyot is a recent B.Tech graduate and a current student at CDAC Mumbai. He is passionate about technology and eager to apply his academic knowledge to real-world software challenges as he steps into the IT industry.",
      image: prajyotImg
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
                About
                <span className="block text-yellow-300">CleanStreet</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
                Empowering communities to create positive change, one report at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="#mission" 
                  className="inline-flex items-center justify-center bg-white text-primary hover:bg-gray-100 font-semibold px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  <Icon name="Target" size={20} className="mr-2" />
                  Our Mission
                </a>
                <a 
                  href="#team" 
                  className="inline-flex items-center justify-center border-white text-white hover:bg-white hover:text-primary border px-6 py-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  <Icon name="Users" size={20} className="mr-2" />
                  Meet Our Team
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg?w=600&h=400&fit=crop"
                  alt="Community members collaborating"
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-white bg-opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              We believe that every community deserves a voice in shaping its future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg mr-4">
                  <Icon name="Target" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Our Mission</h3>
              </div>
              <p className="text-lg text-text-secondary leading-relaxed">
                {missionData.mission}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg mr-4">
                  <Icon name="Eye" size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Our Vision</h3>
              </div>
              <p className="text-lg text-text-secondary leading-relaxed">
                {missionData.vision}
              </p>
            </div>
          </div>
          </div>
          </section>

      {/* Team Section - Updated to display 3 members */}
      <section id="team" className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Passionate individuals dedicated to empowering communities through technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-border text-center hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about-us" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/team" className="text-gray-300 hover:text-white transition-colors">Our Team</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                {/* <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li> */}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/feedback" className="text-gray-300 hover:text-white transition-colors">Feedback</a></li>
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

export default AboutUs;