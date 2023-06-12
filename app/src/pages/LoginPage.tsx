import React, { Component } from 'react';
import UserForm from '../components/UserForm';

interface LoginPageProps {
  toggle: () => void;
}

export default class LoginPage extends Component<LoginPageProps> {
  closeLoginForm = () => {
    this.props.toggle();
    window.location.href="/";
  };

  render() {
    return (
      <div className="container">
        <UserForm mode="login" onSubmit={this.closeLoginForm}/>
      </div>
    );
  }
}

