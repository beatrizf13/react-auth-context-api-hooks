import React from 'react';

import { useAuth } from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>sign out</button>
    </>
  );
};

export default Dashboard;
