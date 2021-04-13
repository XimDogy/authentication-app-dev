import React, {useState} from 'react';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';

const Home = () => {
    const [isLogged, setisLogged] = useState(true);
    return (
        <>
        
        {
            !isLogged 
            ? <Register />
            : <Profile />
        }
        
        </>

    )
}

export default Home;