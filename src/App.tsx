import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import PortfolioGrid from './components/PortfolioGrid';
import PortfolioDetail from './components/PortfolioDetail';
import ContactForm from './components/ContactForm';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import LegalPages from './components/LegalPages';
import SEOHead from './components/SEOHead';
import { tracking } from './lib/tracking';

// Track page views and update SEO
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    tracking.trackPageView();
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    tracking.init();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <PageTracker />
        <Navigation />
        <Routes>
          <Route path="/" element={
            <>
              <SEOHead />
              <Hero />
              <Services />
              <PortfolioGrid />
              <BlogList />
              <ContactForm />
            </>
          } />
          <Route path="/portfolio" element={
            <>
              <SEOHead 
                title="Portfolio | SUMILAND & SUB STUDIO"
                description="Explore our creative portfolio showcasing brand identity design, web development, package design, and digital marketing projects."
              />
              <PortfolioGrid />
            </>
          } />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/blog" element={
            <>
              <SEOHead 
                title="Blog | SUMILAND & SUB STUDIO"
                description="Latest insights on design, technology, and digital transformation from our expert team."
              />
              <BlogList />
            </>
          } />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={
            <>
              <SEOHead 
                title="Contact Us | SUMILAND & SUB STUDIO"
                description="Get in touch with our team for your design, web development, and branding needs. Located in Phoenix, AZ."
              />
              <ContactForm />
            </>
          } />
          <Route path="/legal" element={
            <>
              <SEOHead 
                title="Legal Information | SUMILAND & SUB STUDIO"
                description="Privacy Policy, Terms of Service, and Cookie Policy for SUMILAND & SUB STUDIO."
              />
              <LegalPages />
            </>
          } />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;