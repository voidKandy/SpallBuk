import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

const url = process.env.REACT_APP_PUBLIC_URL;
console.log(`URL: ${url}`)

const Session = () => {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
     
    const establishSession = async () => {
      try {
         
        const response = await axios.get(`${url}/`);
        console.log(`Response: ${response}`);
         
        const { sessionId } = response.data;
        console.log(`Response: ${sessionId}`);
         
        setSessionId(sessionId);
      } catch (error) {
        console.error('Error establishing session:', error);
      }
    };

     
    establishSession();
  }, []);
  return null;
};

export default Session;

