import React, { useState } from 'react';
import ResizableTextarea from './ResizableTextarea';
import { Prompt } from '../types';

const PromptForm: React.FC = () => {
  const [formValues, setFormValues] = useState<Prompt>({
    user_uuid: "",
    name: "",
    description: "",
    prompt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform any desired actions with the form data
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <ResizableTextarea title="Prompt:"/>
      </div>
      <div>
        <ResizableTextarea title="Description:"/>
    </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PromptForm;

