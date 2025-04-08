import React, {useState} from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';// Import your CSS file
function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const isFormValid = username.trim() !== '' && password.trim() !== '';


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return; // Early return if form is not valid

        try {
            // Send POST request to '/login' endpoint
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json(); // Parse JSON response
            if (response.ok) {
                alert(`Welcome back, ${username}!`);
                navigate('/'); // redirect to homepage
            } else {
                alert(`Login failed: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: Could not connect to server');
        }
    };

  return (
    <div className='LoginPage'>
        <div className='LoginBox'>
            <h1>Enter User Login Credentials</h1>
            <div className='LoginForm'>
                <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />

                <label></label>
                <button type="submit" disabled={!isFormValid}>Login</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;
