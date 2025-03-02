import React from 'react';
import './Footer.css';
// Import the icon from assets folder
import icon from '../../assets/icon.svg';

function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-container">
        <div className="newsletter">
          <div className="newsletter-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>Subscribe to our newsletter</span>
          </div>
          <button className="subscribe-button">Subscribe</button>
        </div>
        <div className="help-section">
          <span className="need-help">Need help?</span>
          <a href="#" className="contact-link">Contact us</a>
        </div>
      </div>

      <hr className="divider" />

      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Company Info */}
        <div className="company-info">
          <div className="footer-logo">
            {/* Replace inline SVG with imported image */}
            <img src={icon} alt="RP Finder Logo" width="30" height="30" />
            <span className="footer-title">RP Finder</span>
          </div>
          <p className="company-description">
            Connecting you with reliable local contractors for all your service needs.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a href="#" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="footer-section">
          <h3 className="footer-section-title">Popular categories</h3>
          <div className="categories-grid">
            <div className="categories-column">
              <a href="#" className="category-link">Air conditioning</a>
              <a href="#" className="category-link">Painting</a>
              <a href="#" className="category-link">Electrician</a>
              <a href="#" className="category-link">Concrete</a>
              <a href="#" className="category-link">Plumbing</a>
              <a href="#" className="category-link">Roofing</a>
            </div>
            <div className="categories-column">
              <a href="#" className="category-link">Cleaning</a>
              <a href="#" className="category-link">Heating & furnace</a>
              <a href="#" className="category-link">Carpentry</a>
              <a href="#" className="category-link">Flooring</a>
              <a href="#" className="category-link">Pest control</a>
              <a href="#" className="category-link">Landscaping</a>
            </div>
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-section company-section">
          <h3 className="footer-section-title">Company</h3>
          <div className="company-links">
            <a href="#" className="company-link">About</a>
            <a href="#" className="company-link">Press & announcements</a>
            <a href="#" className="company-link">Careers at Finder</a>
            <a href="#" className="company-link">Contact us</a>
            <a href="#" className="company-link">Terms of use</a>
            <a href="#" className="company-link">Privacy</a>
          </div>
        </div>
      </div>


      {/* Copyright and Payment Methods */}
      <div className="footer-bottom">
        <div className="copyright">
          © All rights reserved. Made by <a href="#" className="copyright-link">RP Finder</a>
        </div>
        <div className="payment-methods">
          <img src="https://via.placeholder.com/40x25?text=Visa" alt="Visa" className="payment-icon" />
          <img src="https://via.placeholder.com/40x25?text=Mastercard" alt="Mastercard" className="payment-icon" />
          <img src="https://via.placeholder.com/40x25?text=PayPal" alt="PayPal" className="payment-icon" />
          <img src="https://via.placeholder.com/40x25?text=Google+Pay" alt="Google Pay" className="payment-icon" />
          <img src="https://via.placeholder.com/40x25?text=Apple+Pay" alt="Apple Pay" className="payment-icon" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;