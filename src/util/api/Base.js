import axios from 'axios';

export default class Base {
  constructor() {
    this.client = this._createClient()
  }

  _createClient() {
    return axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 3000
    })
  }
}
