// src/pages/profile/ProfilePage.jsx
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import SettingsView from './SettingsView';

const ProfilePage = () => {
  const [view, setView] = useState('profile');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div>
      {view === 'profile' ? (
        <ProfileCard onChangeView={() => handleViewChange('settings')} />
      ) : (
        <SettingsView onChangeView={() => handleViewChange('profile')} />
      )}
    </div>
  );
};

export default ProfilePage;
