import {Component} from 'react';
import UserForm from '../components/UserForm';

interface NewUserPageProps {
  toggle: () => void;
}

const emptyFunction = () => {};

export default class NewUserPage extends Component<NewUserPageProps> {
  closeNewUserForm = () => {
    this.props.toggle();
    window.location.href="/";
  };

  render() {
    return (
      <div className="container">
        <UserForm mode="add" onSubmit={emptyFunction}/>
      </div>
    );
  }
}

