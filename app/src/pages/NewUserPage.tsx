import React from 'react';
import UserForm from '../components/UserForm';

const emptyFunction = () => {};

function NewUserPage() {
  return (
    <div className="container">
      <UserForm mode="add" onSubmit={emptyFunction}/>
    </div>
  );
}

export default NewUserPage;
