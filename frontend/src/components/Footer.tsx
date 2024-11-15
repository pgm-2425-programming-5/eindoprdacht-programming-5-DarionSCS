import React from "react";

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-10 pt-10">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="#" className="text-sm hover:text-green-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-300 transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-300 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-300 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">123 Grocery Lane</p>
            <p className="text-sm">City, State, 12345</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: test@test.com</p>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-green-300 transition"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 transition"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a
                href="#"
                className="text-white hover:text-green-300 transition"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-green-600 pt-4 text-center text-sm text-green-300">
          <p>
            &copy; {new Date().getFullYear()} Grocery App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
