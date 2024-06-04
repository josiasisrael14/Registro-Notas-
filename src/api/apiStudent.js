import axios from "axios"
import Promises, { resolve } from 'bluebird';

export const getWhereAll = () => {
    return new Promises((resolve, reject) => {
      return axios.get(`http://127.0.0.1:8080/student/all`)
      .then(data => { 
        console.log('data', data)
        resolve(data.data) 
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  }