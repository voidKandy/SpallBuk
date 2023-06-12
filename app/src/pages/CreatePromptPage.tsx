import React from 'react';
import PromptForm from '../components/PromptForm';
import HomeButton from "../components/HomeButton";

function CreatePromptPage() {
  return (
    <div className="container">
      <HomeButton />
      <PromptForm />
    </div>
  );
}

export default CreatePromptPage;

