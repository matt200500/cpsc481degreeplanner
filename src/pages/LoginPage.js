import React, {useState} from 'react';
import '../styles/Login.css'; // Import your CSS file
function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isFormValid = username.trim() !== '' && password.trim() !== '';


    const handleSubmit = (e) => {
        e.preventDefault();
        // handle login logic here
      };
  return (
    <div className='LoginPage'>
      <h1>Enter Login Credentials</h1>
      <div className='LoginForm'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}/>

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" disabled={!isFormValid}>Login</button>
          </form>
        </div>
    </div>
  );
}

export default LoginPage;
