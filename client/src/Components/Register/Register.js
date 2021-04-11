import React from 'react';
import './Register.css';
import logo  from '../../images/devchallenges-light.svg';
import googleLogo from '../../images/Google.svg';
import facebookLogo from '../../images/Facebook.svg';
import twitterLogo from '../../images/Twitter.svg';
import githubLogo from '../../images/Gihub.svg';

const Register = () => {
    return (
        <div className="card">
            <img src={logo} alt="devchallenges" />
            <h5>Join thousands of learners from around the world </h5>
            <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
            
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button>Start coding now</button>
            
            <a href="#">or continue with these social profile</a>
            <img src={googleLogo} alt="google" />
            <img src={facebookLogo} alt="facebook" />
            <img src={twitterLogo} alt="twitter" />
            <img src={githubLogo} alt="github" />
        </div>
    )
}

export default Register;