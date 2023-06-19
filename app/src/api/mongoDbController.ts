import axios from 'axios';

const url = process.env.REACT_APP_PUBLIC_URL;

export class MongoDbController {
  constructor(private props: {collection: "prompts" | "users" | "sessions"}) {}

  // if (this.props.collection == "users") {
  //
  async getUserFromSID(sessionId: String) {
    try {
      let response = await axios.get(`${url}/sessions/${sessionId}`)
      return response.data.uuid;
    } catch(error) {
      console.error(error);
    }
  }
  
  async editData(name: string, data: object) {
    try {
      const response = await axios.put(`${url}/${this.props.collection}/${name}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  

  async postData(data: object) {
    try {
      const response = await axios.post(`${url}/${this.props.collection}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

async dropDataByName(name: string) {
    try {
      const response = await axios.delete(`${url}/${this.props.collection}/${name}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getCountForUid(n: string, x: string) {
    try {
      const response = await axios.get(`${url}/${n}/by_id/${x}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getByUUID(uuid: string) {
    try {
      const response = await axios.get(`${url}/${this.props.collection}/by_id/${uuid}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getByName(name: string) {
    try {
      const response = await axios.get(`${url}/${this.props.collection}/${name}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllData() {
    try {
      const response = await axios.get(`${url}/${this.props.collection}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default MongoDbController;
