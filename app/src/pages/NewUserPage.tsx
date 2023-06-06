import React from 'react';
import UserForm from '../components/UserForm';


function NewUserPage() {
  return (
    <div className="container">
      <UserForm mode="add" />
    </div>
  );
}

export default NewUserPage;
