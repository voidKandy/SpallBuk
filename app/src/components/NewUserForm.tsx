import React, { useState } from 'react';
import ResizableTextarea from './ResizableTextarea';
import { User } from '../../types';
import MongoDbController from "../api/MongoDbController";
import crypt from 'crypto';

const NewUserForm: React.FC = () => {
    const [formValues, setFormValues] = useState<User>({
      name: "",
      uuid: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    async function pushUser(user: User) {
      const controller = new MongoDbController({collection: "users"});
      const existingUser = await controller.getByName(formValues.name);
      console.log(existingUser);
      if (!existingUser) { 
       await controller.postData(user);
      } else {
          console.log("Already Exists.");
      }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        formValues.uuid = crypto.randomUUID();
        console.log(formValues);
        pushUser(formValues);
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
      </form>
    )
  };

  export default NewUserForm;
