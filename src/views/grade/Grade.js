import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllGrade} from 'src/api/apiGrade';
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
                  <button>Editar</button>
                  <button>Eliminar</button>
                </>
            </>
          ),
        },
      ];
      return (
        <div>
        <h1>lista de grados</h1>
        <button>Crear Nuevo Grado</button>
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