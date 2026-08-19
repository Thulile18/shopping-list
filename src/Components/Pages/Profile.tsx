import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import PageLayout from '../components/common/PageLayout';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfilePassword from '../components/profile/ProfilePassword';

const Profile: React.FC = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <PageLayout>
      <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '2rem' }}>
        My Profile
      </h1>
      <div className="profile-grid">
        <ProfileInfo />
        <ProfilePassword />
      </div>
    </PageLayout>
  );
};

export default Profile;