import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img
                src="https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/Sumiland%20Design//SUMIL&SUB%20STUDIO%20LOGO.png"
                alt="Sumiland Studio Logo"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold">SUMILAND & SUB STUDIO</span>
            </div>
            <p className="text-gray-400">
              Crafting digital experiences that inspire and transform businesses through innovative design solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/sumiland_design/" className="text-gray-400 hover:text-[#037ffc] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/sumiland-sub-studio?trk=public_post_feed-actor-name" className="text-gray-400 hover:text-[#037ffc] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Home
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Portfolio
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Blog
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Contact
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Brand Identity Design
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Web Development
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Package Design
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-flex items-center group">
                  Digital Marketing
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@sumiland.studio" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  jessica.lee@sumisubi.com
                </a>
              </li>
              <li>
                <address className="text-gray-400 not-italic inline-flex items-center">
                  <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                  Phoenix, AZ, USA
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} SUMILAND & SUB STUDIO. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}