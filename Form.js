import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = ['India', 'United States', 'Canada', 'United Kingdom', 'Australia'];
const citiesByCountry = {
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Glasgow'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
};

const Form = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
    showPassword: false
  });

  // Error state
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      valid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      valid = false;
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits';
      valid = false;
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = 'Country is required';
      valid = false;
    }

    // City validation
    if (!formData.city) {
      newErrors.city = 'City is required';
      valid = false;
    }

    // PAN validation
    if (!formData.panNo.trim()) {
      newErrors.panNo = 'PAN Number is required';
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo)) {
      newErrors.panNo = 'PAN Number is invalid';
      valid = false;
    }

    // Aadhar validation
    if (!formData.aadharNo.trim()) {
      newErrors.aadharNo = 'Aadhar Number is required';
      valid = false;
    } else if (!/^\d{12}$/.test(formData.aadharNo)) {
      newErrors.aadharNo = 'Aadhar Number must be 12 digits';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Navigate to success page with form data
      navigate('/success', { state: formData });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    });
  };

  // Check if form is valid for submit button
  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.username.trim() && formData.username.length >= 4 &&
      formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password && formData.password.length >= 6 &&
      formData.phoneNumber.trim() && /^\d{10}$/.test(formData.phoneNumber) &&
      formData.country &&
      formData.city &&
      formData.panNo.trim() && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNo) &&
      formData.aadharNo.trim() && /^\d{12}$/.test(formData.aadharNo)
    );
  };

  // Get cities based on selected country
  const getCities = () => {
    return formData.country ? citiesByCountry[formData.country] : [];
  };

  return (
    <div className="form-container">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="form-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        {/* Username */}
        <div className="form-group">
          <label>Username*</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password*</label>
          <div className="password-input">
            <input
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              {formData.showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number*</label>
          <div className="phone-input">
            <select
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
            >
              <option value="+91">India (+91)</option>
              <option value="+1">USA/Canada (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+61">Australia (+61)</option>
            </select>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              className={errors.phoneNumber ? 'error' : ''}
            />
          </div>
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>

        {/* Country */}
        <div className="form-group">
          <label>Country*</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? 'error' : ''}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <span className="error-message">{errors.country}</span>}
        </div>

        {/* City */}
        <div className="form-group">
          <label>City*</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country}
            className={errors.city ? 'error' : ''}
          >
            <option value="">Select City</option>
            {getCities().map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        {/* PAN Number */}
        <div className="form-group">
          <label>PAN Number*</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            placeholder="Ex: ABCDE1234F"
            className={errors.panNo ? 'error' : ''}
          />
          {errors.panNo && <span className="error-message">{errors.panNo}</span>}
        </div>

        {/* Aadhar Number */}
        <div className="form-group">
          <label>Aadhar Number*</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            placeholder="Enter 12-digit number"
            className={errors.aadharNo ? 'error' : ''}
          />
          {errors.aadharNo && <span className="error-message">{errors.aadharNo}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-btn"
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;