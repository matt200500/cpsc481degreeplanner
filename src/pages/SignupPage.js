import React, {useState} from 'react';
import '../styles/Signup.css';
import { useNavigate } from 'react-router-dom';
function SignupPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const isFormValid = username.trim() !== '' && password.trim() !== '';


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return; // Early return if form is not valid

        console.log("Form submitted");

        try {
            // Send POST request to '/signup' endpoint
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json(); // Parse JSON response
            if (response.ok) {
                console.log('Signup successful:', data);
                alert('Signup successful!');
                navigate('/')
                // Handle success
            } else {
                throw new Error(data.message || 'Failed to signup');
            }
        } catch (error) {
            console.error('Signup error:', error);
            // Optionally handle errors, e.g., show error message to the user
        }
    };

  return (
    <div className='SignupPage'>
      <div className='SignupBox'>
        <h1>Enter a new account</h1>
        <div className='SignupForm'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />

            <label></label>
            <button type="submit" disabled={!isFormValid}>Signup</button>
            </form>
          </div>
      </div>
    </div>
  );
}

export default SignupPage;
