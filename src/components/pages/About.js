import React from "react";
import Layout from "../layouts/Layout";
import aboutImage from "../image/login.jpg"; 
import '../css/about.css';

function About() {
  return (
    <Layout title="About Us - Ecommer">
      <div className="about-container">

        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-text">
            <h1>About Ecommer</h1>
            <p>
              At Ecommer, we bring you the best products with seamless shopping experience. 
              Our mission is to make online shopping easy, reliable, and enjoyable.
            </p>
          </div>
          <div className="about-hero-image">
            <img src={aboutImage} alt="About Us" />
          </div>
        </section>

        {/* Mission Section */}
        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide high-quality products, excellent customer service, and 
            an intuitive shopping platform that makes your experience simple and enjoyable.
          </p>
        </section>

        {/* Features Section */}
        <section className="about-features">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Wide Selection</h3>
              <p>Thousands of products across categories to choose from.</p>
            </div>
            <div className="feature-card">
              <h3>Fast Delivery</h3>
              <p>Reliable and speedy delivery straight to your doorstep.</p>
            </div>
            <div className="feature-card">
              <h3>Secure Payments</h3>
              <p>Safe and encrypted payment options for peace of mind.</p>
            </div>
            <div className="feature-card">
              <h3>Customer Support</h3>
              <p>24/7 assistance to resolve any queries you may have.</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default About;
