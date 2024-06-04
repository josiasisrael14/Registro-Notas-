import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAll} from 'src/api/apiStudent';
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
                  <button>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de Estudiantes</h1>
        <button>Crear</button>
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