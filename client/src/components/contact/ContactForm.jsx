import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaSpinner, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import './ContactForm.css';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial="hidden"
      animate="visible"
    >
      <div className="contact-form__grid">
        {/* Name Field */}
        <motion.div
          className="contact-form__field"
          custom={0}
          variants={inputVariants}
        >
          <label htmlFor="name" className="contact-form__label">
            Full Name <span className="contact-form__required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <span className="contact-form__error">{errors.name}</span>
          )}
        </motion.div>

        {/* Email Field */}
        <motion.div
          className="contact-form__field"
          custom={1}
          variants={inputVariants}
        >
          <label htmlFor="email" className="contact-form__label">
            Email Address <span className="contact-form__required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="contact-form__error">{errors.email}</span>
          )}
        </motion.div>

        {/* Phone Field */}
        <motion.div
          className="contact-form__field"
          custom={2}
          variants={inputVariants}
        >
          <label htmlFor="phone" className="contact-form__label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`contact-form__input ${errors.phone ? 'contact-form__input--error' : ''}`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <span className="contact-form__error">{errors.phone}</span>
          )}
        </motion.div>

        {/* Subject Field */}
        <motion.div
          className="contact-form__field"
          custom={3}
          variants={inputVariants}
        >
          <label htmlFor="subject" className="contact-form__label">
            Subject <span className="contact-form__required">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`contact-form__input ${errors.subject ? 'contact-form__input--error' : ''}`}
            placeholder="What is this about?"
          />
          {errors.subject && (
            <span className="contact-form__error">{errors.subject}</span>
          )}
        </motion.div>

        {/* Message Field */}
        <motion.div
          className="contact-form__field contact-form__field--full"
          custom={4}
          variants={inputVariants}
        >
          <label htmlFor="message" className="contact-form__label">
            Message <span className="contact-form__required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`contact-form__textarea ${errors.message ? 'contact-form__textarea--error' : ''}`}
            placeholder="Tell us about your project..."
            rows={5}
          />
          {errors.message && (
            <span className="contact-form__error">{errors.message}</span>
          )}
        </motion.div>
      </div>

      {/* Submit Button */}
      <motion.div
        className="contact-form__action"
        custom={5}
        variants={inputVariants}
      >
        <button
          type="submit"
          className="contact-form__submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <FaSpinner className="contact-form__submit-icon contact-form__submit-icon--spinning" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FaPaperPlane className="contact-form__submit-icon" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Status Messages */}
      {status === 'success' && (
        <motion.div
          className="contact-form__status contact-form__status--success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaCheck className="contact-form__status-icon" />
          <span>Your message has been sent successfully!</span>
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          className="contact-form__status contact-form__status--error"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaExclamationCircle className="contact-form__status-icon" />
          <span>Something went wrong. Please try again.</span>
        </motion.div>
      )}
    </motion.form>
  );
};

export default ContactForm;
