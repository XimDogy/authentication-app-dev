import React from 'react';
import {Link} from 'react-router-dom';
import './Register.css';
import logo  from '../../images/devchallenges.svg';
import googleLogo from '../../images/Google.svg';
import facebookLogo from '../../images/Facebook.svg';
import twitterLogo from '../../images/Twitter.svg';
import githubLogo from '../../images/Gihub.svg';

const Register = () => {

    return (
        <div className="card">
            
            <img id="logo" src={logo} alt="devchallenges" />
            <h5>Join thousands of learners from around the world </h5>
            <p className="quote">Master web development by making real-life projects. There are multiple paths for you to choose</p>
            
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button className="primary-button">Start coding now</button>
            
            <p className="or-message" href="#">or continue with these social profile</p>

            <div className="social-logos">
                <img src={googleLogo} alt="google" />
                <img src={facebookLogo} alt="facebook" />
                <img src={twitterLogo} alt="twitter" />
                <img src={githubLogo} alt="github" />
            </div>
            <span className="already-message" >Adready a member? <Link to="/login"><button>Login</button></Link></span>
            
        </div>
        
    )
}

export default Register;