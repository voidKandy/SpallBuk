import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

const url = process.env.REACT_APP_PUBLIC_URL;

const Session = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    
    const establishSession = async () => {
      const storedSessionId = sessionStorage.getItem('sessionId');
      if (storedSessionId) {
        console.log(`Response: ${storedSessionId}`);
        setSessionId(storedSessionId as string);
      } else {
        try {
           
          const response = await axios.get(`${url}/`);
           
          const { sessionId } = response.data;
          console.log(`Response: ${sessionId}`);

          sessionStorage.setItem('sessionId', sessionId);
           
         setSessionId(sessionId);
        } catch (error) {
          console.error('Error establishing session:', error);
        }
      }
    };

    
    establishSession();

  }, []);
  return null;
};

export default Session;

