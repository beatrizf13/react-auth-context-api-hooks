import React from 'react';

import { useAuth } from '../../contexts/auth';

const Login: React.FC = () => {
  const { signIn } = useAuth();

  async function handleSignIn() {
    await signIn();
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={handleSignIn}>sign in</button>
    </>
  );
};

export default Login;
