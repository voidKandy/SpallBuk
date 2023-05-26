import axios from 'axios';

export class MongoDbController {
  async postData(data: object) {
    try {
      const response = await axios.post('http://localhost:8000/prompts', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async dropDataByName(name: string) {
    try {
      const response = await axios.delete(`http://localhost:8000/prompts/${name}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getByName(name: string) {
    try {
      const response = await axios.get(`http://localhost:8000/prompts/${name}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllData() {
    try {
      const response = await axios.get('http://localhost:8000/prompts');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
};

const controller = new MongoDbController();

controller.dropDataByName('John Doe');
controller.getAllData();

