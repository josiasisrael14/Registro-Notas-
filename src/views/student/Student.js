import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAll,createDataStudent,getWhereStudent} from 'src/api/apiStudent';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({ studentId: '', nameStudent: '',lastName:'',birthDate:''});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getWhereAll();
            console.log(responseData);
    
            // Ordenar los datos por idStuff
            const sortedData = responseData.sort((a, b) => {
              return parseInt(a.studentId) - parseInt(b.studentId);
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
        setNewRow({ studentId: '', nameStudent: '',lastName:'',birthDate:''});
        setModalIsOpen(true);
      };

      const handleAdd = async () => {
        try {
          console.log("ver la fecha enviada",newRow);
          const response = await createDataStudent(newRow);
          setData([...data, response]);
          setNewRow({ studentId: '', nameStudent: '',lastName:'',birthDate:'' });
          setModalIsOpen(false); // Cerrar el modal después de agregar
          alert('Registrado correctamente');
        } catch (error) {
          console.error('Error al crear datos:', error);
        }
      };

      const getWhereId = async (id) => {
        try {
        //const id =2;
          const responseData = await getWhereStudent(id);
    
          console.log("ver si funciona",responseData);
          console.log('ver si me trae data:', responseData);
    
          setModalIsOpen(true);

          // Formatear la fecha a YYYY-MM-DD
          const formattedDate = responseData.birthDate.split('T')[0];
    
          setNewRow({
            studentId:responseData.studentId,
            nameStudent:responseData.nameStudent,
            lastName:responseData.lastName,
            birthDate:formattedDate
          });
          // Aquí puedes manejar los datos como desees
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };

      const columns = [
        {
          name: 'ID',
          selector: row => row.studentId,
          sortable: true,
        },
        {
          name: 'Nombre',
          selector: row => row.nameStudent,
          sortable: true,
        },
        {
            name: 'Apellidos',
            selector: row => row.lastName,
            sortable: true,
          },
          {
            name: 'Fecha Nacimiento',
            selector: row => row.birthDate,
            sortable: true,
          },
        {
          name: 'Acciones',
          cell: row => (
            <>
                <>
                <button onClick={() => getWhereId(row.studentId)}>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de Estudiantes</h1>
        <button onClick={handleOpenAddModal}>Crear Nuevo Estudiante</button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{newRow.studentId?'Editar Estudiante': 'Crear Nuevo Estudiante'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formName">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="id"
                value={newRow.studentId}
                onChange={(e) => setNewRow({ ...newRow, studentId: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Estudiante"
                value={newRow.nameStudent}
                onChange={(e) => setNewRow({ ...newRow, nameStudent: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                value={newRow.lastName}
                onChange={(e) => setNewRow({ ...newRow, lastName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Fecha Nacimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha Nacimiento"
                value={newRow.birthDate}
                onChange={(e) => setNewRow({ ...newRow, birthDate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={newRow.studentId? "":handleAdd}>{newRow.studentId?'Guardar Cambios':'Agregar'}</Button>
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