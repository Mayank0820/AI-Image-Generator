import React, { useState, useRef } from 'react';
import './Profile.css'; 
import o2 from "../assets/images/user.png"

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileImage, setProfileImage] = useState(o2);
    const [formData, setFormData] = useState({
        name: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : "John Doe",
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        bio: 'Software developer passionate about creating great user experiences.'
    });

    const photoUploadRef = useRef(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', formData);
        alert('Profile updated successfully!');
    };

    return (
        <>
        <div className="outerp">
        <div className="containerp">
            <div className="tabs">
                <button className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabChange('profile')}>Profile</button>
                <button className={`tab-button ${activeTab === 'security' ? 'active' : ''}`} onClick={() => handleTabChange('security')}>Security</button>
                <button className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => handleTabChange('notifications')}>Notifications</button>
            </div>

            {activeTab === 'profile' && (
                <div id="profile" className="tab-content active">
                    <div className="profile-header">
                        <h2 className="profile-title">Profile Information</h2>
                        <p className="profile-subtitle">Update your personal information and profile settings</p>
                    </div>

                    <form id="profile-form" onSubmit={handleSubmit}>
                        <div className="profile-photo">
                            <img src={profileImage} alt="Profile photo" className="avatar" id="profile-image" />
                            <input
                                type="file"
                                id="photo-upload"
                                hidden
                                accept="image/*"
                                ref={photoUploadRef}
                                onChange={handlePhotoUpload}
                            />
                            <button type="button" className="photo-button" onClick={() => photoUploadRef.current.click()}>
                                Change Photo
                            </button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button type="submit" className="button">Save Changes</button>
                    </form>
                </div>
            )}

            {activeTab === 'security' && (
                <div id="security" className="tab-content active">
                    <div className="profile-header">
                        <h2 className="profile-title">Security Settings</h2>
                        <p className="profile-subtitle">Manage your password and security preferences</p>
                    </div>

                    <button className="button-outline">Change Password</button>
                    <button className="button-outline">Two-Factor Authentication</button>
                </div>
            )}

            {activeTab === 'notifications' && (
                <div id="notifications" className="tab-content active">
                    <div className="profile-header">
                        <h2 className="profile-title">Notification Preferences</h2>
                        <p className="profile-subtitle">Choose how you want to receive notifications</p>
                    </div>

                    <button className="button-outline">Email Notifications</button>
                    <button className="button-outline">Push Notifications</button>
                </div>
            )}
        </div>
        </div>
        </>
    );
};

export default Profile;
