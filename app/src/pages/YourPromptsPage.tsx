import React, { useEffect, useState } from 'react';
import MongoDbController from '../api/MongoDbController';
import CollectionDisplay from '../components/CollectionDisplay';
import { Prompt } from "../types";

function YourPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    async function fetchData() {
      const controller = new MongoDbController({collection: "prompts"});
      console.log(controller)
      const fetchedPrompts = await controller.getAllData();
      setPrompts(fetchedPrompts);
    }

    fetchData();
  }, []);

  console.log(prompts);


  return (
    <div className="container">
      <CollectionDisplay prompts={prompts}/>
    </div>
  );
}

export default YourPromptsPage;

