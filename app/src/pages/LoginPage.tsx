import React from 'react';
import UserForm from '../components/UserForm';


function LoginPage() {
  return (
    <div className="container">
      <UserForm mode="login" />
    </div>
  );
}

export default LoginPage;
