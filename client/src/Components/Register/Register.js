import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Register.css';
import logo  from '../../images/devchallenges.svg';
import Footer from '../Footer/Footer';

//api
import { register } from '../../actions/userActions.js'
import OAuth from '../OAuth/OAuth';


const Register = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showMessage, setshowMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const profile = JSON.parse(localStorage.getItem("profile"));

    if(profile) {
        history.push('/');
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        register(email, password, history, setshowMessage, setIsLoading);
    }

    

    return (
        <div className="wrapper">
            <div className="show-message-div">
                <p>{showMessage}</p>
            </div>
            <div className="card">
            
                <img id="logo" src={logo} alt="devchallenges" />
                <h5>Join thousands of learners from around the world </h5>
                <p className="quote">Master web development by making real-life projects. There are multiple paths for you to choose</p>
                
                <form onSubmit={(e) => handleRegister(e)} >
                    <div className="email-wrapper">
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                    </div>
                    
                    <div className="password-wrapper">
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                    </div>
                    

                    <button type="submit" className="primary-button">{isLoading? <i className="fas fa-circle-notch fa-spin"></i> : "Start coding now"}</button>
                    
                </form>
                <p className="or-message" href="#">or continue with these social profile</p>

                <OAuth setshowMessa={setshowMessage} history={history} setIsLoading={setIsLoading}/>
                <span className="already-message" >Adready a member? <Link to="/login"><button>Login</button></Link></span>
            
            </div>
            <Footer />
        </div>
        
    )
}

export default Register;