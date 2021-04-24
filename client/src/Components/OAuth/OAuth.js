import React from 'react'
import { GoogleLogin } from 'react-google-login';
import googleLogo from '../../images/Google.svg';
import facebookLogo from '../../images/Facebook.svg';
import twitterLogo from '../../images/Twitter.svg';
import githubLogo from '../../images/Gihub.svg';

//API
import * as api from '../../api/index.js';

const googleClientId = '773225217401-3biod8tsvc5l5h5daqcs88h9ls61134c.apps.googleusercontent.com';


const OAuth = ({setshowMessage, history, setIsLoading}) => {

    const googleSuccess = async (res) => {
        setIsLoading(true);
        const result = res?.profileObj;
        const token = res?.tokenId;

        localStorage.setItem('profile', JSON.stringify({ user: result, token: token }));

        try {
            const {data} = await api.googleAuth(result);
            localStorage.setItem("profile", JSON.stringify({ user: data.user, token: data.token }));
            history.push('/');
        } catch (error) {
            console.log(error);
            setIsLoading(false);

        }
    }

    const googleFailure = (error) => {
        console.log(error);
        setshowMessage("Google Sign In was unsuccessful. Try Again Later");
    }

    return (
        <div className="social-logos">
            <GoogleLogin 
                clientId={googleClientId}
                render={(renderProps) => (
                    <img src={googleLogo} alt="google" onClick={renderProps.onClick} disabled={renderProps.disabled}  />
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />
            {/* <img src={googleLogo} alt="google" /> */}
            <img src={facebookLogo} alt="facebook" />
            <img src={twitterLogo} alt="twitter" />
            <img src={githubLogo} alt="github" />
        </div>
    )
}

export default OAuth
