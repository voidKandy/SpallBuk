import MongoDbController from '../api/MongoDbController';
import React from 'react';
import { User, Session } from '../types';


const Login = async(userId: string) => {
  const sessionId = sessionStorage.getItem('sessionId'); 

  if (sessionId == null) {
    console.log("Session is Null");
    return;
  }
  
  const sessionController = new MongoDbController({collection: "sessions"});
  const userController = new MongoDbController({collection: "users"});

  const userInfo = await userController.getByName(userId);

  let existingSession;
  try {
    existingSession = await sessionController.getByName(sessionId);
  } catch(error) {
    existingSession = null;
  }

  const newSession = {
    uuid: userInfo.uuid,
    name: sessionId,
  };
    
  if (existingSession == null) {
    try {
      await sessionController.postData(newSession);

    } catch (error) {
      console.error(error);
    }
  }
  else {
    console.log("Issue with SessionID");
  }

};

export default Login;
