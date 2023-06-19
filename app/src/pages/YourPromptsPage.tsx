import { useEffect, useState } from 'react';
import MongoDbController from '../api/MongoDbController';
import CollectionDisplay from '../components/CollectionDisplay';
import { Prompt } from "../types";
import HomeButton from "../components/HomeButton";
import styles from './styles/collection.module.css';

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
    <div className="flex"> 
      <HomeButton />
      <div className="flex flex-row">
        <CollectionDisplay prompts={prompts}/>
      </div>
    </div>
  );
}

export default YourPromptsPage;

