import React, { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAllSubjectStudent,createTuitionStudent} from 'src/api/apiSubjectStudent';
import {getWhereAllSection}from 'src/api/apiSection';
import {getWhereAllGrade}from 'src/api/apiGrade';
import {getWhereAll}from 'src/api/apiStudent';
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MyComponent = () => {
    const [grades, setGrades] = useState([]);
    const [sections, setSections] = useState([]);
    const [students,setStudents]=useState([]);
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newRow, setNewRow] = useState({ idSubjectStudent: '',nameStudent: '',lastName:'', grade: '',specificationLevel: '',section: ''});
    console.log("ver newRow actual", newRow);
    useEffect(() => {
        const fetchData = async () => {
          try {
        const gradesData=await getWhereAllGrade();
        console.log(gradesData)
        setGrades(gradesData)

        const sectionsData = await getWhereAllSection();
        console.log(sectionsData);
        setSections(sectionsData);

        const studentsData = await getWhereAll();
        console.log(studentsData);
        setStudents(studentsData);

            const responseData = await getWhereAllSubjectStudent();
            console.log("ver respuesta de listar todo ",responseData);
    
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
       
      const handleOpenAddModal = () => {
        setNewRow({ idSubjectStudent: '', nameStudent: '', grade: '', section: ''});
        setModalIsOpen(true);
      };

      const handleAdd = async () => {
        try {
          const response = await createTuitionStudent(newRow);
          setData([...data, response]);
          setModalIsOpen(false);
          setNewRow({ idSubjectStudent: '', nameStudent: '', grade: '', section: ''});
          alert('Registrado correctamente');
        } catch (error) {
          if (error.response.status===422){
            const errorMessage=error.response.data.Fields[0].description;
            alert("Error: " + errorMessage);
          }else{
          console.error('Error al crear datos:', error);
          }
        }
      };


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
          name: 'apellidos',
          selector: row => row.lastName,
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
        <button onClick={handleOpenAddModal}>Crear</button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
  <Modal.Header closeButton>
  <Modal.Title>{newRow.idSubjectStudent?'Editar Matricula': 'Crear Matricula'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formTeacher">
        <Form.Label>Alumno</Form.Label>
        <Form.Control
          as="select"
          value={newRow.nameStudent}
          onChange={(e) => setNewRow({ ...newRow, nameStudent: e.target.value })}
        >
          <option value="">{newRow.idSubjectStudent?newRow.nameStudent + " " + newRow.lastName:"Seleccione un estudiante"}</option>
          {students.map(student => (
            <option key={student.studentId} value={student.studentId}>
              {student.nameStudent + " " + student.lastName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formGrade">
        <Form.Label>Grado</Form.Label>
        <Form.Control
          as="select"
          value={newRow.grade}
          onChange={(e) => setNewRow({ ...newRow, grade: e.target.value })}
        >
          <option value="">{newRow.idSubjectStudent?newRow.grade:"Seleccione un grado"}</option>
          {grades.map(grade => (
            <option key={grade.idDegree} value={grade.idDegree}>
              {grade.nameDegree + " " + grade.specificLevel}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formSection">
        <Form.Label>Sección</Form.Label>
        <Form.Control
          as="select"
          value={newRow.section}
          onChange={(e) => setNewRow({ ...newRow, section: e.target.value })}
        >
          <option value="">{newRow.idSubjectStudent?newRow.section:"Seleccione una sección"}</option>
          {sections.map(section => (
            <option key={section.idSection} value={section.idSection}>
              {section.nameSection}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
    <Button variant="primary" onClick={newRow.idSubjectStudent ? " " : handleAdd}>
            {newRow.idSubjectStudent ? 'Guardar Cambios' : 'Agregar'}</Button>
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