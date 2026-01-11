import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">LoanLink</h3>
            <p className="text-gray-400 mb-4">
              Empowering communities through accessible microloans. We connect
              borrowers with opportunities and make financial growth possible
              for everyone.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.twitter.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.instagram.com"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/loans"
                  className="hover:text-primary-500 transition-colors"
                >
                  All Loans
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-500 transition-colors"
                >
                  Business Loans
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-500 transition-colors"
                >
                  Personal Loans
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-500 transition-colors"
                >
                  Education Loans
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-500 transition-colors"
                >
                  Agricultural Loans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <FiMapPin className="text-primary-500" />
                <span>Jatrabari, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary-500" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary-500" />
                <span>support@loanlink.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} LoanLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;