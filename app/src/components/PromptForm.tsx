import React, { useState } from 'react';
import ResizableTextarea from './ResizableTextarea';
import { Prompt } from '../types';
import MongoDbController from '../api/MongoDbController';
import "../globals.css";

const sessionId = sessionStorage.getItem('sessionId'); 

const PromptForm: React.FC = () => {
  const [formValues, setFormValues] = useState<Prompt>({
    uuid: "",
    name: "",
    description: "",
    prompt: "",
  });

  const handleNameChange = (value: string) => {
    setFormValues((prevValues) => ({
        ...prevValues,
        name: value,
    }));
  };

  const handlePromptChange = (value: string) => {
    setFormValues((prevValues) => ({
        ...prevValues,
        prompt: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormValues((prevValues) => ({
        ...prevValues,
        description: value,
    }));
  };

  async function pushPrompt(prompt: Prompt) {
    const promptController = new MongoDbController({collection: 'prompts'});

    let message;
    try {
      await promptController.postData(prompt);
      message = "Prompt updated";
    } catch (error) {
      console.error(error);
      message = "Problem updating prompt";
    }
    return message;
  }
  
  async function getCurrentUser(sessionId: string | null) {
    if (sessionId != null) {
      const sessionController = new MongoDbController({collection: 'sessions'})
      const currentSession = await sessionController.getByName(sessionId) 
      setFormValues((prevValues) => ({
          ...prevValues,
          uuid: currentSession.uuid,
      }));
    } else {
      console.log("SessionId is null")
    }

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    getCurrentUser(sessionId);
    console.log(`Values: ${formValues.uuid}`);
    pushPrompt(formValues);
  };

  return (
    <form>
      <div className="text-white">
        <ResizableTextarea title="Name:" onChange={handleNameChange}/>
      </div>
      <div>
        <ResizableTextarea title="Prompt:" onChange={handlePromptChange}/>
      </div>
      <div>
        <ResizableTextarea title="Description:" onChange={handleDescriptionChange}/>
     </div>
      <h3 className="links" onClick={handleSubmit}>[ Submit ]</h3>
    </form>
  );
};

export default PromptForm;

