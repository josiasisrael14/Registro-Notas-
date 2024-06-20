import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllSection,createDataSection,getWhereSection,updateSection} from 'src/api/apiSection';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({ idSection: '', nameSection: ''});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getWhereAllSection();
            console.log(responseData);
    
            // Ordenar los datos por idStuff
            const sortedData = responseData.sort((a, b) => {
              return parseInt(a.idSection) - parseInt(b.idSection);
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
        setNewRow({ idSection: '', nameSection: ''});
        setModalIsOpen(true);
      };

      const handleAdd = async () => {
        try {
          const response = await createDataSection(newRow);
          setData([...data, response]);
          setNewRow({ idSection: '', nameSection: '' });
          setModalIsOpen(false); // Cerrar el modal después de agregar
          alert('Registrado correctamente');
        } catch (error) {
          console.error('Error al crear datos:', error);
        }
      };

      const getWhereId = async (id) => {
        try {
        //const id =2;
          const responseData = await getWhereSection(id);
    
          console.log(responseData);
          console.log('Datos de la API:', data);
    
          setModalIsOpen(true);
    
          setNewRow({
            idSection:responseData.idSection,
            nameSection:responseData.nameSection
          });
          // Aquí puedes manejar los datos como desees
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };

      const handleEdit = async (e) => {
        e.preventDefault();
        try {
          const updatedRow = await updateSection(newRow);
          const updatedData = data.map(item => 
            item.idSection === newRow.idSection ? updatedRow : item
          );
          setData(updatedData);
          setModalIsOpen(false); // Cerrar el modal después de editar
          alert('Actualizado correctamente');
        } catch (error) {
          console.error('Error al editar datos:', error);
        }
      };

      const columns = [
        {
          name: 'ID',
          selector: row => row.idSection,
          sortable: true,
        },
        {
          name: 'Grado',
          selector: row => row.nameSection,
          sortable: true,
        },
        {
          name: 'Acciones',
          cell: row => (
            <>
                <>
                <button onClick={() => getWhereId(row.idSection)}>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de secciones</h1>
        <button onClick={handleOpenAddModal}>Crear Nueva Seccion</button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{newRow.idSection?'Editar Sesion': 'Crear Nueva Seccion'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formName">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="id"
                value={newRow.idSection}
                onChange={(e) => setNewRow({ ...newRow, idSection: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label>Seccion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre Seccion"
                value={newRow.nameSection}
                onChange={(e) => setNewRow({ ...newRow, nameSection: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={newRow.idSection?handleEdit:handleAdd}>{newRow.idSection?'Guardar Cambios':'Agregar'}</Button>
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