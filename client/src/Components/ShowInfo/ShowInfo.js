import React from 'react';
import './ShowInfo.css';


const ShowInfo = ({setIsEditing, userInfo, profilePicture}) => {
    return (
        <>
            <div className="profile-intro">
                <h1 className="profile-title">Personal info</h1>
                <p>Basic info,like your name and photo</p>
            </div>

                <div className="profile-card">
                    <div className="profile-edit-row">
                        <div className="profile-edit-title">
                            <h1>Profile</h1>
                            <p>Some info maybe visible to other people</p>
                        </div>

                        <button className="profile-edit-btn" onClick={() => {setIsEditing(true)}} >
                            Edit
                        </button>
                    </div>
                    <table className="profile-table">

                        <tr className="first-row">
                            <th>PHOTO</th>
                            <td className="profile-image-data"><img className="profile-image" src={profilePicture} alt="profile"/></td>
                        </tr>

                        <tr>
                            <th>NAME</th>
                            <td>{userInfo.name}</td>
                        </tr>

                        <tr>
                            <th>BIO</th>
                            <td>{userInfo.bio}</td>
                        </tr>
                        <tr>
                            <th>PHONE</th>
                            <td>{userInfo.phone}</td>
                        </tr>

                        <tr>
                            <th>EMAIL</th>
                            <td>{userInfo.email}</td>
                        </tr>

                        <tr>
                            <th>PASSWORD</th>
                            <td>************</td>
                        </tr>
                    </table>

                </div>
        </>
    )
}

export default ShowInfo
