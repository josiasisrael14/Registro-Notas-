import axios from "axios"
import Promises, { resolve } from 'bluebird';

export const getWhereAllGrade = () => {
    return new Promises((resolve, reject) => {
      return axios.get(`http://127.0.0.1:8080/degree`)
      .then(data => { 
        console.log('data', data)
        resolve(data.data) 
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  }

  export const createDataGrade = (newRow) => {
    return new Promises((resolve, reject) => {
      axios.post(`http://127.0.0.1:8080/degree`, newRow)
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

  export const getWhereGrade = (id) => {
    return new Promises((resolve, reject) => {
      return axios.get(`http://127.0.0.1:8080/degree/getWhere?idDegree=${id}`)
      .then(data => { 
        console.log('data', data)
        resolve(data.data) 
      }).catch(error => {
        console.log('error', error)
        reject(error)
      })
    })
  }

  export const updateGrade = (updatedRow) => {
    return new Promises((resolve, reject) => {
    return axios.patch(`http://127.0.0.1:8080/degree/update`, updatedRow)
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