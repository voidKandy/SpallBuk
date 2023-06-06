import React, { useState } from 'react';
import ResizableTextarea from './ResizableTextarea';
import { User } from '../types';
import MongoDbController from "../api/MongoDbController";
import crypt from 'crypto';
import Login from '../auth/Login';

interface UserFormProps {
  mode: 'add'|'login';
}

const UserForm: React.FC<UserFormProps> = ({mode}) => {
    const [formValues, setFormValues] = useState<User>({
      name: "",
      uuid: "",
    });
    const [message, SetMessage] = useState<String>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    async function pushUser(user: User) {
      const controller = new MongoDbController({collection: "users"});
      const existingUser = await controller.getByName(user.name);

      let message;

     if (!existingUser) {
        try {
          await controller.postData(user);
          message = "Your username has been added";
        } catch (error) {
          console.error(error);
          message = "Error creating user";
        }
      } else if (existingUser.name == user.name) { 
        message = "Username already exists";
      } else if (user.name == '') {
        message = "Please input a username";
      } else {
      message = "Undefined Error";
    }
      SetMessage(message);
    }

    async function loginUser(username: string) {
      if (username != '') {
         try {
          Login(username);
          SetMessage("Logged in")
        } catch {
          SetMessage("Problem logging in")
        }
      }
    }

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      formValues.uuid = crypto.randomUUID();

      if (mode == 'add') {
        pushUser(formValues);
      } else if (mode == 'login') {
        loginUser(formValues.name)
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
         {message && <p>{message}</p>} 
      </form>
    )
  };

  export default UserForm;
