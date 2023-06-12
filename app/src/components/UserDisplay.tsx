import React, { useEffect, useState } from 'react';
import MongoDbController from '../api/MongoDbController';
import styles from './styles/user.module.css';

interface UserInfo {
  uid: String,
  name: String,
  createdAt: String,
  n_prompts: number,
  n_active_sessions: number,
}

interface UserDisplayProps {
  sessionID: String;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ sessionID }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userController = new MongoDbController({ collection: "users" });
      const promptController = new MongoDbController({ collection: "prompts" });
      const sessionController = new MongoDbController({ collection: "sessions" });

      const userID = await userController.getUserFromSID(sessionID);
      const user_res = await userController.getByUUID(userID);
      
      const prmp_res = await promptController.getByUUID(userID);
      const sess_res = await sessionController.getByUUID(userID);

        setUserInfo({
          uid: userID,
          name: user_res[0].name,
          createdAt: user_res[0].createdAt,
          n_prompts: prmp_res.length,
          n_active_sessions: sess_res.length,
        });

      // console.log(`USER: ${user.name}`)
    };

    fetchUser();
  }, [sessionID]);
  

  if (userInfo != null) {
    return (
      <div className={styles.user}>
        <h1 className={styles.username}>
          Welcome {userInfo.name}
        </h1>
        <h5>
          {userInfo.n_prompts} prompts found
        </h5>
        <h5>
           {userInfo.n_active_sessions} active sessions 
        </h5>
      </div>
    );
  } else {
    return (
      <div>
        {null}
      </div>
    );

  }
};

export default UserDisplay;
