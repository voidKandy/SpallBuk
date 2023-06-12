import MongoDbController from '../api/MongoDbController';

export const Logout = async() => {
  const sessionId = sessionStorage.getItem('sessionId'); 

  if (sessionId == null) {
    console.log("Session is Null");
    return 1;
  }
  
  const sessionController = new MongoDbController({collection: "sessions"});

  let existingSession;
  try {
    existingSession = await sessionController.getByName(sessionId);
  } catch(error) {
    existingSession = null;
  }

  if (existingSession == null) {
    console.log("No One to logout");
    return 1;
  }
  
  await sessionController.dropDataByName(sessionId);
  sessionStorage.removeItem('sessionId');
  return 0;

};

export default Logout;

