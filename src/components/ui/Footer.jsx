import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = ({ variant = 'full' }) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className="bg-white border-t border-border">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-text-tertiary">
              © {currentYear} CleanStreet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Icon name="MapPin" size={32} className="text-primary mr-2" />
              <span className="text-xl font-bold text-text-primary">CleanStreet</span>
            </div>
            <p className="text-text-secondary mb-4 max-w-md">
              Making our communities cleaner and safer by empowering citizens to report and track street issues efficiently.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-text-tertiary hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Icon name="Facebook" size={20} />
              </a>
              <a
                href="#"
                className="text-text-tertiary hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Icon name="Twitter" size={20} />
              </a>
              <a
                href="#"
                className="text-text-tertiary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Icon name="Instagram" size={20} />
              </a>
              <a
                href="#"
                className="text-text-tertiary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/clean-street-landing-page"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/report-issue"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Report Issue
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@cleanstreet.com"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Icon name="Mail" size={16} className="text-primary mr-2" />
              <span className="text-text-secondary text-sm">info@cleanstreet.com</span>
            </div>
            <div className="flex items-center">
              <Icon name="Phone" size={16} className="text-primary mr-2" />
              <span className="text-text-secondary text-sm">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Icon name="MapPin" size={16} className="text-primary mr-2" />
              <span className="text-text-secondary text-sm">123 Main St, City, State 12345</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-tertiary text-sm">
              © {currentYear} CleanStreet. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-text-tertiary hover:text-primary text-sm transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-text-tertiary hover:text-primary text-sm transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/cookies"
                className="text-text-tertiary hover:text-primary text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;