import React, {useState} from 'react';
import '../styles/Signup.css';
function SignupPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const isFormValid = username.trim() !== '' && password.trim() !== '';


    const handleSubmit = (e) => {
        e.preventDefault();
        // handle login logic here
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
