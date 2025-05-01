import React, { useState } from 'react'; // Import React and useState hook to manage state
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation after login

const AdminLogin = () => {
  // State variables to store the input values for username, password, and message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // useNavigate hook to programmatically navigate to a different route after successful login
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Check if the entered username and password match the predefined values
    if (username === 'admin' && password === 'nathansmaw') {
      // If the credentials are correct, navigate to the '/admindetails' page
      navigate('/admindetails');
    } else {
      // If the credentials are incorrect, display an error message
      setMessage('❌ Invalid username or password.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
      {/* Heading for the login form */}
      <h2>Log In Homie</h2>

      {/* Login form with input fields for username and password */}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Username input field */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state on change
          required // Make the username field required
          style={{ padding: '10px', borderRadius: '5px', fontSize: '16px' }} // Inline styling for input field
        />
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          required // Make the password field required
          style={{ padding: '10px', borderRadius: '5px', fontSize: '16px' }} // Inline styling for input field
        />
        {/* Submit button */}
        <button type="submit" style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}>
          Login
        </button>
      </form>

      {/* Conditionally render error message if username/password is invalid */}
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default AdminLogin;
