import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111827', color: '#fff', marginTop: '80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>

        {/* Top Section - 4 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '32px' }}>

          {/* About */}
          <div>
            <h3 style={{ color: '#4ade80', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>MediShop</h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>
              Your trusted online pharmacy for quality medicines delivered safely to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: '#4ade80', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['About Us', 'Contact', 'FAQs', 'Blog'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = '#4ade80'}
                    onMouseLeave={e => e.target.style.color = '#9ca3af'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 style={{ color: '#4ade80', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Policies</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Privacy', 'Terms', 'Shipping', 'Returns'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = '#4ade80'}
                    onMouseLeave={e => e.target.style.color = '#9ca3af'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: '#4ade80', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Contact</h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>Email: abasalisshaikh@gmail.com</p>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px' }}>Phone: +91-901800-MEDICINE</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['f', 't', 'in'].map((icon) => (
                <a key={icon} href="#" style={{
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: '#1f2937', borderTop: '1px solid #1f2937', marginBottom: '32px' }} />

        {/* Features Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>

          {/* Licensed */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
            </svg>
            <div>
              <p style={{ fontWeight: '600', fontSize: '15px' }}>Licensed & Certified</p>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>ISO certified pharmacy</p>
            </div>
          </div>

          {/* Fast Delivery */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <div>
              <p style={{ fontWeight: '600', fontSize: '15px' }}>Fast Delivery</p>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>24-48 hours delivery</p>
            </div>
          </div>

          {/* 100% Safe */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <div>
              <p style={{ fontWeight: '600', fontSize: '15px' }}>100% Safe</p>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>Secure transactions</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ borderColor: '#1f2937', borderTop: '1px solid #1f2937', marginBottom: '24px' }} />

        {/* Copyright */}
        <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
          © 2024 MediShop. All rights reserved – Abbasali Shaikh
        </p>
      </div>
    </footer>
  );
};

export default Footer;
