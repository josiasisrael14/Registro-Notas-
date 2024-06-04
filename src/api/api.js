import axios from "axios"
import Promises, { resolve } from 'bluebird';
import { reject } from "lodash";
/*export const fetchDataFromAPI = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/stuff?idStuff=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      mode: 'cors', // Agregar el modo CORS
      credentials: 'include' // Incluir las credenciales si es necesario
      });
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };*/

export const fetchDataFromAPI = (id) => {
  return new Promises((resolve, reject) => {
    return axios.get(`http://127.0.0.1:8080/stuff?idStuff=${id}`)
    .then(data => { 
      console.log('data', data)
      resolve(data.data) 
    }).catch(error => {
      console.log('error', error)
      reject(error)
    })
  })
}

export const getWhereAllStuff = () => {
  return new Promises((resolve, reject) => {
    return axios.get(`http://127.0.0.1:8080/stuff/all`)
    .then(data => { 
      console.log('data', data)
      resolve(data.data) 
    }).catch(error => {
      console.log('error', error)
      reject(error)
    })
  })
}

export const createData = (newRow) => {
  return new Promises((resolve, reject) => {
    axios.post(`http://127.0.0.1:8080/stuff`, newRow)
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

export const updateData = (updatedRow) => {
  return new Promises((resolve, reject) => {
  return axios.patch(`http://127.0.0.1:8080/stuff/update`, updatedRow)
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

export const deleteDataStuff = (id) => {
  return new Promises((resolve, reject) => {
    return axios.delete(`http://127.0.0.1:8080/stuff?idStuff=${id}`)
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