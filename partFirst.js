import React, { useState } from 'react';

const Form1 = ({ formData, setFormData, nextStep }) => {
  const [emailId, setEmailId] = useState(formData.emailId);
  const [password, setPassword] = useState(formData.password);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailId) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(emailId)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*\d{2,})(?=.*[^a-zA-Z0-9]{2,}).{8,}$/;
    if (!password) {
      setPasswordError('Password is required');
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least 2 uppercase letters, 2 lowercase letters, 2 numbers, and 2 special characters.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleNext = () => {
    validateEmail();
    validatePassword();
    if (!emailError && !passwordError) {
      setFormData({ ...formData, emailId, password });
      nextStep();
    }
  };

  return (
    <div>
      <h2>Form 1</h2>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          onBlur={validateEmail}
        />
        {emailError && <p>{emailError}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
        />
        {passwordError && <p>{passwordError}</p>}
      </div>
      <button disabled={!emailId || !password} onClick={handleNext}>
        Save and Next
      </button>
    </div>
  );
};

const Form2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [address, setAddress] = useState(formData.address);
  const [firstNameError, setFirstNameError] = useState('');
  const [addressError, setAddressError] = useState('');

  const validateFirstName = () => {
    const nameRegex = /^[A-Za-z]{2,50}$/;
    if (!firstName) {
      setFirstNameError('First name is required');
    } else if (!nameRegex.test(firstName)) {
      setFirstNameError('First name should only contain alphabets');
    } else {
      setFirstNameError('');
    }
  };

  const validateAddress = () => {
    if (!address) {
      setAddressError('Address is required');
    } else if (address.length < 10) {
      setAddressError('Address should be at least 10 characters long');
    } else {
      setAddressError('');
    }
  };

  const handleNext = () => {
    validateFirstName();
    validateAddress();
    if (!firstNameError && !addressError) {
      setFormData({ ...formData, firstName, lastName, address });
      nextStep();
    }
  };

  return (
    <div>
      <h2>Form 2</h2>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={validateFirstName}
        />
        {firstNameError && <p>{firstNameError}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={validateAddress}
        />
        {addressError && <p>{addressError}</p>}
      </div>
      <button onClick={prevStep}>Back</button>
      <button disabled={!firstName || !address} onClick={handleNext}>
        Save and Next
      </button>
    </div>
  );
};

const Form3 = ({ formData, setFormData, handleSubmit, prevStep }) => {
  const [countryCode, setCountryCode] = useState(formData.countryCode);
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber);
  const [countryCodeError, setCountryCodeError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const validateCountryCode = () => {
    if (!countryCode) {
      setCountryCodeError('Country code is required');
    } else if (countryCode !== '+91' && countryCode !== '+1') {
      setCountryCodeError('Invalid country code');
    } else {
      setCountryCodeError('');
    }
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError('Invalid phone number');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSave = () => {
    validateCountryCode();
    validatePhoneNumber();
    if (!countryCodeError && !phoneNumberError) {
      setFormData({ ...formData, countryCode, phoneNumber });
      handleSubmit();
    }
  };

  return (
    <div>
      <h2>Form 3</h2>
      <div>
        <label>Country Code:</label>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          onBlur={validateCountryCode}
        >
          <option value="">Select Country Code</option>
          <option value="+91">India (+91)</option>
          <option value="+1">America (+1)</option>
        </select>
        {countryCodeError && <p>{countryCodeError}</p>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onBlur={validatePhoneNumber}
        />
        {phoneNumberError && <p>{phoneNumberError}</p>}
      </div>
      <div>
        <label>
          <input type="checkbox" />
          Accept Terms and Conditions
        </label>
      </div>
      <button onClick={prevStep}>Back</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Perform the HTTP POST request here using the formData
    // Reset the form data and navigate to the '/posts' page
    setFormData({
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      countryCode: '',
      phoneNumber: '',
    });
    setStep(1);
    // Redirect to '/posts' using your preferred method (e.g., React Router)
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <Form1
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Form2
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Form3
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderForm()}</div>;
};

export default MultiStepForm;
