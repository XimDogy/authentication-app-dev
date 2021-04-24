import React, {useEffect, useState} from 'react'
import './Profile.css'
import logo from '../../images/devchallenges.svg'
import test from '../../images/demo-profile-picture.jpg'
import Footer from '../Footer/Footer'
import ShowInfo from '../ShowInfo/ShowInfo'
import EditInfo from '../EditInfo/EditInfo'
import {useHistory, useLocation} from 'react-router-dom';
import decode from 'jwt-decode';

//Api
import  * as api from '../../api/index.js';


const Profile = () => {
    const [isDropped, setIsDropped] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState(test);
    const [userName, setUserName] = useState("Username");

    //GETTING DATA FROM LOCAL STORAGE
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")));
    const [userInfo, setUserInfo] = useState({
        id: null,
        name: "",
        email: "",
        bio: "",
        phone: "",
        picture: "",
    });

    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        localStorage.clear();
        setProfile(null);
        history.push('/login');
    }

    const getData = async () => {
        const { data } = await api.getUserInfo(profile.user.id);
        localStorage.setItem("profile", JSON.stringify(data));
        setUserInfo(data.user);
    }


    useEffect(() => {
        const token = profile?.token;
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }else {
               getData();
            }
            
        }
    }, [location]);

    useEffect(() => {
        if(userInfo?.picture !== "") {
            setProfilePicture(userInfo?.picture);
        }
        if(userInfo?.name!== "") {
            setUserName(userInfo?.name);
        }
    }, [userInfo?.picture, userInfo?.name])

    const handleDropper = () => {
        setIsDropped(!isDropped);
    }


    if(!profile){
        history.push('/login');
    }

    return (

        <div className="profile">
            <div className="nav">
                <img className="profile-logo" src={logo} alt="logo" />
                <div className="dropdown" onClick={handleDropper}>
                    <img src={profilePicture} alt="user-profile" />
                    <span className="user-name">{userName}</span>
                    {
                        isDropped ?
                        (
                            <>
                                <svg className="dropdown-icon" onClick={handleDropper} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 14l5-5 5 5H7z"/></svg>
                                <div className="drawer">
                        
                                    <div  className="drawer-row">
                                        <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                                        My Profile
                                    </div>
                                 
                                    <div className="drawer-row">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                                        Group Chat
                                    </div>
                                    <hr className="drawer-line"/>
                                    <div onClick={logout} className="drawer-row logout-p-text">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EB5757"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                                        Logout
                                    </div>
                                </div>
                            </>
                        )
                        : <svg className="dropdown-icon" onClick={handleDropper} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
                    }
                    
                </div>
            </div>

           

            <div className="wrapper">

                {
                    isEditing
                    ? <EditInfo setIsEditing={setIsEditing} userInfo={userInfo} setUserInfo={setUserInfo}  profilePicture={profilePicture} /> 
                    : <ShowInfo setIsEditing={setIsEditing} userInfo={userInfo} profilePicture={profilePicture} />
                }
                
                <Footer />
            </div>
        </div>
    )
}

export default Profile
