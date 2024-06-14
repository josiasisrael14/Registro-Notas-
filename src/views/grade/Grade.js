import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllGrade,createDataGrade,getWhereGrade} from 'src/api/apiGrade';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({ idDegree: '', nameDegree: '', specificLevel: '' });

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getWhereAllGrade();
            console.log(responseData);
    
            // Ordenar los datos por idStuff
            const sortedData = responseData.sort((a, b) => {
              return parseInt(a.idDegree) - parseInt(b.idDegree);
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
        setNewRow({ idDegree: '', nameDegree: '', specificLevel: '' });
        setModalIsOpen(true);
      };

      const handleAdd = async () => {
        try {
          const response = await createDataGrade(newRow);
          setData([...data, response]);
          setNewRow({ idDegree: '', nameDegree: '', specificLevel: '' });
          setModalIsOpen(false); // Cerrar el modal después de agregar
          alert('Registrado correctamente');
        } catch (error) {
          console.error('Error al crear datos:', error);
        }
      };

      const getWhereId = async (id) => {
        try {
        //const id =2;
          const responseData = await getWhereGrade(id);
    
          console.log(responseData);
          console.log('Datos de la API:', data);
    
          setModalIsOpen(true);
    
          setNewRow({
            idDegree:responseData.idDegree,
            nameDegree:responseData.nameDegree,
            specificLevel:responseData.specificLevel
          });
          // Aquí puedes manejar los datos como desees
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };
    

      const columns = [
        {
          name: 'ID',
          selector: row => row.idDegree,
          sortable: true,
        },
        {
          name: 'Grado',
          selector: row => row.nameDegree,
          sortable: true,
        },
        {
          name: 'Descripción',
          selector: row => row.specificLevel,
          sortable: true,
        },
        {
          name: 'Acciones',
          cell: row => (
            <>
                <>
                <button onClick={() => getWhereId(row.idDegree)}>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de grados</h1>
        <button onClick={handleOpenAddModal}>Crear Nuevo Grado</button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{newRow.idDegree?'Editar grado': 'Crear Nueva Grado'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formName">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="id"
                value={newRow.idDegree}
                onChange={(e) => setNewRow({ ...newRow, idDegree: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Grado"
                value={newRow.nameDegree}
                onChange={(e) => setNewRow({ ...newRow, nameDegree: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción"
                value={newRow.specificLevel}
                onChange={(e) => setNewRow({ ...newRow, specificLevel: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={newRow.idDegree? "":handleAdd}>{newRow.idDegree?'Guardar Cambios':'Agregar'}</Button>
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