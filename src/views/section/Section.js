import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllSection} from 'src/api/apiSection';
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
                  <button>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de secciones</h1>
        <button>Crear Nueva seccion</button>
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