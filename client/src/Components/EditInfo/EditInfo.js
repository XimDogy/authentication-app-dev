import React, {useState} from 'react';
import './EditInfo.css';

//api
import * as api from '../../api/index.js';


const EditInfo = ({setIsEditing, setUserInfo, userInfo, profilePicture}) => {
    const [updatedInfo, setUpdatedInfo] = useState({...userInfo, picture: profilePicture, password: ""});
    const [showMessage, setShowMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async (e) => {
        setIsLoading(true);

        e.preventDefault();
        try {
            console.log(updatedInfo);


                if(updatedInfo.password.length < 6 && updatedInfo.password !=="" ) {
                    setShowMessage("Password must be at least 6 characters");
                    setIsLoading(false);
                }else {
                    const { data } = await api.edit(userInfo.id, updatedInfo);
                    localStorage.setItem('profile', JSON.stringify(data));
                    setUserInfo(updatedInfo);
                    setShowMessage("Successfully Updated");
                    setIsLoading(false);
                    setUpdatedInfo({...updatedInfo, password: ""});
                }


            

        } catch (error) {
            console.log(error);
            setShowMessage(error.response.data.message);
            setIsLoading(false);
        }


    }


    const convertPhoto = (e) => {
        const file = e.target.files[0];
        var convertedFiles = [];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let fileInfo = {
                image: reader.result,
                type: file.type,
                name: file.name,
                size: Math.round(file.size / 1000) + ' kB',
            }
            convertedFiles.push(fileInfo);
            setUpdatedInfo({...updatedInfo, picture: convertedFiles[0].image});
        }
      }

   
    return (
        <div className="edit-info">
            <div className="back-btn-div"  onClick={() => {setIsEditing(false)}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#2D9CDB"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>
                <span> Back</span>
            </div>
            <div className="edit-info-card">
                <h1>Change Info</h1>
                <p>Changes will be reflected to every services</p>

                <form className="edit-info-form" onSubmit={handleUpdate}>
                    <div className="edit-profile-image-div">
                        <div className="image-wrapper">
                            <img src={updatedInfo.picture} alt="user-profile" />
                            <svg onClick={() => document.getElementById('photo').click()} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>                        </div>
                        <input type="file" name="photo" id="photo" className="photo-input" onChange={convertPhoto}/>
                        <span>CHANGE PHOTO</span>
                    </div>

                    <label>Name</label>
                    <input value={updatedInfo.name} onChange={(e) => setUpdatedInfo({...updatedInfo, name: e.target.value})} className="edit-name" type="text" name="name" id="name" placeholder="Enter your name..." />

                    <label>Bio</label>
                    <textarea  value={updatedInfo.bio} onChange={(e) => setUpdatedInfo({...updatedInfo, bio: e.target.value})} className="edit-bio" type="text" name="bio" id="bio" placeholder="Enter your bio..." />

                    <label>Phone</label>
                    <input value={updatedInfo.phone} onChange={(e) => setUpdatedInfo({...updatedInfo, phone: e.target.value})} className="edit-phone" type="text" name="phone" id="phone" placeholder="Enter your phone..." />

                    <label>Email</label>
                    <input value={updatedInfo.email} onChange={(e) => setUpdatedInfo({...updatedInfo, email: e.target.value})} className="edit-email" type="email" name="email" id="email" placeholder="Enter your email..." />

                    <label>Password</label>
                    <input value={updatedInfo.password} onChange={(e) => setUpdatedInfo({...updatedInfo, password: e.target.value})} className="edit-password" type="password" name="password" id="password" placeholder="Enter your password..." />
                   

                    <button className="edit-info-save-btn" >{isLoading? <i className="fas fa-circle-notch fa-spin"></i> : "Save"}</button>
                    <p className="updateMessage">{showMessage}</p>
                </form>
            </div>
        </div>
    )
}

export default EditInfo
