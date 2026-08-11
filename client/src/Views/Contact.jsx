import { useState } from 'react';
import '../css/contact/counter/contact.css';

const initialValues = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name, value) => {
    if (name === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
        ? ''
        : 'Please enter a valid email.';
    }
    return value.trim().length > 0
      ? ''
      : `Please enter your ${name === 'subject' ? 'subject' : name}.`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(values).forEach((key) => {
      const message = validateField(key, values[key]);
      if (message) newErrors[key] = message;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);

    // Simulated send — replace with a real request to your backend/email service
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="contact-page">
      <nav className="nav">
        <div className="brand">Maison<span>.</span></div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#" className="active">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <span className="eyebrow">Get in Touch</span>
        <h1>Let&apos;s start a <em>conversation</em></h1>
        <p>Have a question or a project in mind? Send us a message and our team will get back to you within one business day.</p>
        <div className="hero-rule" />
      </section>

      <div className="contact-wrap">
        <div className="info-panel">
          <div>
            <h2>Contact Information</h2>
            <p>Reach us directly, or fill in the form and we&apos;ll follow up shortly.</p>
            <ul className="info-list">
              <li>
                <span className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.83.32 1.71.54 2.61.66A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <div className="label">Phone</div>
                  <div className="value">+1 (555) 040-2210</div>
                </div>
              </li>
              <li>
                <span className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M22 6l-10 7L2 6" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </span>
                <div>
                  <div className="label">Email</div>
                  <div className="value">hello@maison.co</div>
                </div>
              </li>
              <li>
                <span className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <div className="label">Studio</div>
                  <div className="value">140 Gold Street, Suite 4B</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="LinkedIn">IN</a>
          </div>
        </div>

        <div className="form-panel">
          {submitted ? (
            <div className="form-success">
              <div className="check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2>Message sent</h2>
              <p>Thanks for reaching out — we&apos;ll be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`field${errors.name ? ' error' : ''}`}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jane Doe"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="error-msg">{errors.name}</div>}
                </div>
                <div className={`field${errors.email ? ' error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane@email.com"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && <div className="error-msg">{errors.email}</div>}
                </div>
              </div>

              <div className={`field${errors.subject ? ' error' : ''}`}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="How can we help?"
                  value={values.subject}
                  onChange={handleChange}
                />
                {errors.subject && <div className="error-msg">{errors.subject}</div>}
              </div>

              <div className={`field${errors.message ? ' error' : ''}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us a little more..."
                  value={values.message}
                  onChange={handleChange}
                />
                {errors.message && <div className="error-msg">{errors.message}</div>}
              </div>

              <button type="submit" className="submit-btn" disabled={submitting}>
                <span>{submitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}