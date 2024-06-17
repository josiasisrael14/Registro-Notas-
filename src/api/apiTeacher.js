import axios from "axios"
import Promises, { resolve } from 'bluebird';

export const getWhereAllTeacher = () => {
    return new Promises((resolve, reject) => {
      return axios.get(`http://127.0.0.1:8080/teacher`)
      .then(data => { 
        console.log('data', data)
        resolve(data.data) 
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  }

  export const createDataTeacher = (newRow) => {
    return new Promises((resolve, reject) => {
      axios.post(`http://127.0.0.1:8080/teacher`, newRow)
        .then(data => { 
          console.log('data', data);
          resolve(data.data);
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        });
    });
  }

  export const getWhereTeacher = (id) => {
    return new Promises((resolve, reject) => {
      return axios.get(`http://127.0.0.1:8080/teacher/getWhere?idTeacher=${id}`)
      .then(data => { 
        console.log('data', data)
        resolve(data.data) 
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  }