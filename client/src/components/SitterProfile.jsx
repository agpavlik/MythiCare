import React from 'react';

const ProfilePage = ({ userInfo }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{userInfo.firstName} {userInfo.lastName}</h2>
      <p><strong>Address:</strong> {userInfo.address}</p>
      <p><strong>Experience:</strong> {userInfo.experience}</p>
      <p><strong>Contact Info:</strong> {userInfo.contactInfo}</p>
    </div>
  );
};

export default ProfilePage;