import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllTeacher,createDataTeacher,getWhereTeacher} from 'src/api/apiTeacher';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({ idTeacher: '', name: '',surnames:'',cellPone:''});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getWhereAllTeacher();
            console.log(responseData);
    
            // Ordenar los datos por idStuff
            const sortedData = responseData.sort((a, b) => {
              return parseInt(a.idTeacher) - parseInt(b.idTeacher);
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

      const handleOpenAddModal = () => {
        setNewRow({ idTeacher: '', name: '',surnames:'', cellPone:''});
        setModalIsOpen(true);
      };

      const handleAdd = async () => {
        try {
          const response = await createDataTeacher(newRow);
          setData([...data, response]);
          setNewRow({ idTeacher: '', name: '' ,surnames:'', cellPone:''});
          setModalIsOpen(false); // Cerrar el modal después de agregar
          alert('Registrado correctamente');
        } catch (error) {
          console.error('Error al crear datos:', error);
        }
      };

      const getWhereId = async (id) => {
        try {
        //const id =2;
          const responseData = await getWhereTeacher(id);
    
          console.log(responseData);
          console.log('Datos de la API:', data);
    
          setModalIsOpen(true);
    
          setNewRow({
            idTeacher:responseData.idTeacher,
            name:responseData.name,
            surnames:responseData.surnames,
            cellPone:responseData.cellPone
          });
          // Aquí puedes manejar los datos como desees
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };

      const columns = [
        {
          name: 'ID',
          selector: row => row.idTeacher,
          sortable: true,
        },
        {
          name: 'Nombre',
          selector: row => row.name,
          sortable: true,
        },
        {
            name: 'Apellidos',
            selector: row => row.surnames,
            sortable: true,
          },
          {
            name: 'Celular',
            selector: row => row.cellPone,
            sortable: true,
          },
        {
          name: 'Acciones',
          cell: row => (
            <>
                <>
                <button onClick={() => getWhereId(row.idTeacher)}>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de profesores</h1>
        <button onClick={handleOpenAddModal}>Crear Nuevo Profesor</button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{newRow.idTeacher?'Editar Profesor': 'Crear Nueva Profesor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formName">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="id"
                value={newRow.idTeacher}
                onChange={(e) => setNewRow({ ...newRow, idTeacher: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Profesor</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Profesor"
                value={newRow.name}
                onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                value={newRow.surnames}
                onChange={(e) => setNewRow({ ...newRow, surnames: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>celular</Form.Label>
              <Form.Control
                type="text"
                placeholder="celular"
                value={newRow.cellPone}
                onChange={(e) => setNewRow({ ...newRow, cellPone: e.target.value })}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={newRow.idTeacher? "":handleAdd}>{newRow.idTeacher?'Guardar Cambios':'Agregar'}</Button>
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