import React from "react";
import Layout from "../layouts/Layout";
import "../css/contact.css";

function Contact() {
  return (
    <Layout title="Contact Us - Ecommer">
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or need support? We’d love to hear from
            you. Fill out the form or reach us through the details below.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p><strong>Email:</strong> support@ecommer.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123, Main Street, New Delhi, India</p>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;
