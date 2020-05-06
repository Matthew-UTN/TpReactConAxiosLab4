import axios from "axios";
export class Service {
  baseUrl = "http://localhost:9001/api/v1/instrumentos/";
  getAll() {
    return axios.get(this.baseUrl).then((res) => res.data);
  }
  getOne(id) {
    return axios.get(this.baseUrl + id).then((res) => res.data);
  }
  save(instrumento) {
    return axios.post(this.baseUrl, instrumento).then(console.log);
  }
  update(id, instrumento) {
    return axios.put(this.baseUrl + id, instrumento).then(console.log);
  }
  delete(id) {
    axios.delete(this.baseUrl + id).then(console.log);
  }
}