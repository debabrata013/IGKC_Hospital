// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-wrap justify-between">
//           <div className="w-full md:w-1/3 mb-6 md:mb-0">
//             <h3 className="text-xl font-bold mb-2">IGKC</h3>
//             <p className="text-gray-400">Efficient healthcare management solutions</p>
//           </div>
//           <div className="w-full md:w-1/3 mb-6 md:mb-0">
//             <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
//             <ul className="text-gray-400">
//               <li><Link to="/" className="hover:text-white">Home</Link></li>
//               <li><Link to="/about" className="hover:text-white">About</Link></li>
//               <li><Link to="/login" className="hover:text-white">Login</Link></li>
//               <li><Link to="/signup" className="hover:text-white">Signup</Link></li>
//             </ul>
//           </div>
//           <div className="w-full md:w-1/3">
//             <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
//             <p className="text-gray-400">Email: info@hms.com</p>
//             <p className="text-gray-400">Phone: 1234567890</p>
//             <div className="mt-4 flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <i className="fab fa-facebook"></i>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <i className="fab fa-twitter"></i>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <i className="fab fa-linkedin"></i>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="mt-8 text-center text-gray-400">
//           <p>&copy; 2023 Hospital Management System. All rights reserved.</p>
//           <p><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Shield,
  Heart
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">IGKC</h3>
            <p className="text-gray-400 leading-relaxed">
              Transforming healthcare management through innovative technology and compassionate care.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <Heart className="text-red-500 h-6 w-6" />
              <span className="text-sm text-gray-400">Caring for Life</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">Services</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center">
                  <span className="hover:translate-x-1 transition-transform duration-200">Careers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>info@igkc.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>123 Healthcare Ave, Medical District</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Clock className="h-5 w-5" />
                <span>24/7 Support Available</span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="mb-4">
              <p className="text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400">Follow us on social media</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <Shield className="h-5 w-5" />
              <span>&copy; {new Date().getFullYear()} IGKC. All rights reserved.</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;