import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllStuff,createData,updateData,fetchDataFromAPI,deleteDataStuff} from 'src/api/api';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newRow, setNewRow] = useState({ idStuff: '', nameStuff: '', description: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
      //const id =2;
        const responseData = await getWhereAllStuff();
        console.log(responseData);

        // Ordenar los datos por idStuff
        const sortedData = responseData.sort((a, b) => {
          return parseInt(a.idStuff) - parseInt(b.idStuff);
      });

        setData(sortedData);
        console.log('Datos de la API:', data);
        // Aquí puedes manejar los datos como desees
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, []); // El segundo argumento del useEffect indica que se ejecutará solo una vez, al montar el componente

  
  const getWhereId = async (id) => {
    try {
    //const id =2;
      const responseData = await fetchDataFromAPI(id);

      console.log(responseData);
      console.log('Datos de la API:', data);

      setModalIsOpen(true);

      setNewRow({
       idStuff:responseData.idStuff,
       nameStuff:responseData.nameStuff,
       description:responseData.description
      });
      // Aquí puedes manejar los datos como desees
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const handleOpenAddModal = () => {
    setNewRow({ idStuff: '', nameStuff: '', description: '' });
    setModalIsOpen(true);
  };

  const handleAdd = async () => {
    try {
      const response = await createData(newRow);
      setData([...data, response]);
      setNewRow({ idStuff: '', nameStuff: '', description: '' });
      setModalIsOpen(false); // Cerrar el modal después de agregar
      alert('Registrado correctamente');
    } catch (error) {
      console.error('Error al crear datos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
        await deleteDataStuff(id); // Esperar a que la eliminación se complete
        const deleteData = data.filter(item => item.idStuff !== id); // Filtrar los datos actualizados
        setData(deleteData); // Actualizar el estado con los datos filtrados
        Swal.fire({
            title: 'Eliminado correctamente',
            icon: 'success'
        });
    } catch (error) {
        console.error('Error al eliminar datos:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar los datos',
            icon: 'error'
        });
    }
};

  /*const handleEdit = async (row) => {
    try {
      const updatedRow = await updateData(row);
      const newData = data.map(item => (item.idStuff === row.idStuff ? updatedRow : item));
      setData(newData);
      setModalIsOpen(false);
      alert('Actualizado correctamente');
    } catch (error) {
      console.error('Error al editar datos:', error);
    }
  };*/

  /*const handleEdit = async () => {
    try {
      // Clonar el objeto newRow para asegurarse de no tener referencias circulares
      const updatedRow = { ...newRow };
      console.log("datos a enviar para actualizar",newRow);
      // Actualizar los datos en el backend
      const response = await updateData(updatedRow);

      // Actualizar los datos en el estado local
      const newData = data.map(item => (item.idStuff === updatedRow.idStuff ? response : item));
      setData(newData);

      setModalIsOpen(false);
      alert('Actualizado correctamente');
    } catch (error) {
      console.error('Error al editar datos:', error);
    }
  };*/

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedRow = await updateData(newRow);
      const updatedData = data.map(item => 
        item.idStuff === newRow.idStuff ? updatedRow : item
      );
      setData(updatedData);
      setModalIsOpen(false); // Cerrar el modal después de editar
      alert('Actualizado correctamente');
    } catch (error) {
      console.error('Error al editar datos:', error);
    }
  };

  /*const handleDelete = async (idStuff) => {
    try {
      await deleteData(idStuff);
      const newData = data.filter(item => item.idStuff !== idStuff);
      setData(newData);
    } catch (error) {
      console.error('Error al eliminar datos:', error);
    }
  };*/

  const columns = [
    {
      name: 'Materia ID',
      selector: row => row.idStuff,
      sortable: true,
    },
    {
      name: 'Nombre Materia',
      selector: row => row.nameStuff,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
            <>
              <button onClick={() => getWhereId(row.idStuff)}>Editar</button>
              <button onClick={() => handleDelete(row.idStuff)}>Eliminar</button>
            </>
        </>
      ),
    },
  ];

  // Log the state of modalIsOpen to debug its changes
  console.log('Modal is open:', modalIsOpen);

  return (
    <div>
      <h1>Listas de Materias</h1>
      <button onClick={handleOpenAddModal}>Crear Nueva Materias</button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{newRow.idStuff?'Editar Materia': 'Crear Nueva Materia'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formName">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="id"
                value={newRow.idStuff}
                onChange={(e) => setNewRow({ ...newRow, nameStuff: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Nombre Materia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Materia"
                value={newRow.nameStuff}
                onChange={(e) => setNewRow({ ...newRow, nameStuff: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción"
                value={newRow.description}
                onChange={(e) => setNewRow({ ...newRow, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={newRow.idStuff?handleEdit:handleAdd}>{newRow.idStuff?'Guardar Cambios':'Agregar'}</Button>
        </Modal.Footer>
      </Modal>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default MyComponent;
