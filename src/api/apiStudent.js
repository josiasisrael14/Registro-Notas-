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

  export const createDataStudent = (newRow) => {
    return new Promises((resolve, reject) => {
      axios.post(`http://127.0.0.1:8080/student`, newRow)
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

  export const getWhereStudent = (id) => {
    return new Promises((resolve, reject) => {
      return axios.get(`http://127.0.0.1:8080/student?studentId=${id}`)
      .then(data => { 
        console.log('data', data)
        resolve(data.data) 
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  }

  export const updateStudent = (updatedRow) => {
    return new Promises((resolve, reject) => {
    return axios.patch(`http://127.0.0.1:8080/student/update`, updatedRow)
        .then(response => {
          console.log('data', response);
          resolve(response.data);
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        });
    });
  };