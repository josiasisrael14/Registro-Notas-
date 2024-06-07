import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllNotes} from 'src/api/apiNotas';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({ note_id: '',nameStudent: '',nameTeacher:'',nameStuff:'',grade: '',specificationLevel: '',section: '',note:'',date:'',comments:''});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const responseData = await getWhereAllNotes();
            console.log(responseData);
    
            // Ordenar los datos por idStuff
            const sortedData = responseData.sort((a, b) => {
              return parseInt(a.note_id) - parseInt(b.note_id);
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
          selector: row => row.note_id,
          sortable: true,
        },
        {
          name: 'Estudiante',
          selector: row => row.nameStudent,
          sortable: true,
        },
        {
            name: 'Profesor',
            selector: row => row.nameTeacher,
            sortable: true,
          },
          {
            name: 'Curso',
            selector: row => row.nameStuff,
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
            name: 'nota',
            selector: row => row.note,
            sortable: true,
          },
          {
            name: 'fecha',
            selector: row => row.date,
            sortable: true,
          },
          {
            name: 'comentario',
            selector: row => row.comments,
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
        <h1>Notas estudiantes </h1>
        <button>nueva calificacion</button>
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