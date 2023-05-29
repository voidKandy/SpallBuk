import React, { useEffect, useState } from 'react';
import MongoDbController from '../api/MongoDbController';
import CollectionDisplay from '../components/CollectionDisplay';
import { User } from "../../types";

function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const controller = new MongoDbController({collection: "users"});
      console.log(controller)
      const fetchedUsers = await controller.getAllData();
      console.log(fetchedUsers);
      setUsers(fetchedUsers);
    }

    fetchData();
  }, []);

  console.log(users);


  return (
    <div className="container">
      <CollectionDisplay users={users}/>
    </div>
  );
}

export default UserListPage;

