import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllTeacher} from 'src/api/apiTeacher';
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
                  <button>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de profesores</h1>
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