import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllSubjectStudent} from 'src/api/apiSubjectStudent';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({ idSubjectStudent: '',nameStudent: '',grade: '',specificationLevel: '',section: ''});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getWhereAllSubjectStudent();
            console.log(responseData);
    
            // Ordenar los datos por idStuff
            const sortedData = responseData.sort((a, b) => {
              return parseInt(a.idSubjectStudent) - parseInt(b.idSubjectStudent);
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
          selector: row => row.idSubjectStudent,
          sortable: true,
        },
        {
          name: 'nombre',
          selector: row => row.nameStudent,
          sortable: true,
        },
        {
            name: 'Grado',
            selector: row => row.grade,
            sortable: true,
          },
          {
            name: 'detalle',
            selector: row => row.specificationLevel,
            sortable: true,
          },
          {
            name: 'seccion',
            selector: row => row.section,
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
        <h1>Alumnos Grado Seccion </h1>
        <button>Crear matricula</button>
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