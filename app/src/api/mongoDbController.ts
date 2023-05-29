import axios from 'axios';


export class MongoDbController {
  constructor(private props: {collection: "prompts" | "users"}) {}


  async postData(data: object) {
    try {
      const response = await axios.post(`http://localhost:8000/${this.props.collection}`, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async dropDataByName(name: string) {
    try {
      const response = await axios.delete(`http://localhost:8000/${this.props.collection}/${name}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getByName(name: string) {
    try {
      const response = await axios.get(`http://localhost:8000/${this.props.collection}/${name}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllData() {
    try {
      const response = await axios.get(`http://localhost:8000/${this.props.collection}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

export default MongoDbController;

// const controller = new MongoDbController();
//
// controller.dropDataByName('John Doe');
// controller.getAllData();

