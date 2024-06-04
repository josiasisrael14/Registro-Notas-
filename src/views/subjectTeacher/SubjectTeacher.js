import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getWhereAll, updateSubjectTeacher,getWhereSubjectTeacher,createData} from 'src/api/apiSubjectTeacher';
import { getWhereAllTeacher } from 'src/api/apiTeacher';
import { getWhereAllGrade } from 'src/api/apiGrade';
import { getWhereAllSection } from 'src/api/apiSection'
import { getWhereAllStuff } from 'src/api/api'
import DataTable from 'react-data-table-component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Componente personalizado para la celda de comentarios
const CommentCell = ({ comment }) => {
  return (
    <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      {comment}
    </div>
  );
};

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [teachers, setTeachers] = useState([]);
const [grades, setGrades] = useState([]);
const [sections, setSections] = useState([]);
const [subjects, setSubjects] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    idSubjectTeacher: '',
    nameTeacher: '',
    grade: '',
    section: '',
    subject: '',
    comments: ''
  });

  console.log(newRow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachersData = await getWhereAllTeacher(); // Suponiendo que tienes una función llamada getTeachers
        console.log("traer todo los nombres de tecaher",teachersData);
        setTeachers(teachersData);

        const gradesData=await getWhereAllGrade();
        console.log(gradesData)
        setGrades(gradesData)

        const sectionsData = await getWhereAllSection(); // Suponiendo que tienes una función llamada getSections
        console.log(sectionsData);
        setSections(sectionsData);
        
        const subject=await getWhereAllStuff();
        console.log(subject)
        setSubjects(subject)

        const responseData = await getWhereAll();
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

  const handleOpenAddModal = () => {
    setNewRow({ idSubjectTeacher: '', nameTeacher: '', grade: '', section: '', subject: '', comments: '' });
    setModalIsOpen(true);
  };

  const handleAdd = async () => {
    try {
      const response = await createData(newRow);
      setData([...data, response]);
      setNewRow({ idSubjectTeacher: '', nameTeacher: '', grade: '', section: '', subject: '', comments: '' });
      setModalIsOpen(false);
      alert('Registrado correctamente');
    } catch (error) {
      console.error('Error al crear datos:', error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedRow = await updateSubjectTeacher(newRow);
      const updatedData = data.map(item => 
        item.idSubjectTeacher === newRow.idSubjectTeacher ? updatedRow : item
      );
      setData(updatedData);
      setModalIsOpen(false);
      alert('Actualizado correctamente');
    } catch (error) {
      console.error('Error al editar datos:', error);
    }
  };

  const getWhereId = async (id) => {
    try {
    //const id =2;
      const responseData = await getWhereSubjectTeacher(id);

      console.log(responseData);
      console.log('Datos de la API:', data);

      setModalIsOpen(true);

      setNewRow({
        idSubjectTeacher:responseData.idSubjectTeacher,
        nameTeacher:responseData.nameTeacher,
        grade:responseData.grade,
        section:responseData.section,
        subject:responseData.subject,
        comments:responseData.comments
      });

      console.log("ver si se muestra los datos a editar",newRow)

      // Asegurarse de que el estado se actualice antes de abrir el modal
      setTimeout(() => {
        setModalIsOpen(true);
      }, 0);
      // Aquí puedes manejar los datos como desees
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.idSubjectTeacher,
      sortable: true,
    },
    {
      name: 'Nombre',
      selector: row => row.nameTeacher,
      sortable: true,
    },
    {
      name: 'Grado',
      selector: row => row.grade,
      sortable: true,
    },
    {
      name: 'Seccion',
      selector: row => row.section,
      sortable: true,
    },
    {
      name: 'Materia',
      selector: row => row.subject,
      sortable: true,
    },
    {
      name: 'Comentario',
      selector: row => row.comments,
      sortable: true,
      cell: row => <CommentCell comment={row.comments} />,
    },
    {
      name: 'Acciones',
      cell: row => (
        <>
          <>
            <button onClick={() => getWhereId(row.idSubjectTeacher)}>Editar</button>
            <button>Eliminar</button>
          </>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Asignatura Profesor</h1>
      <button onClick={handleOpenAddModal}>Crear</button>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} centered>
  <Modal.Header closeButton>
  <Modal.Title>{newRow.idSubjectTeacher?'Editar Asignatura': 'Crear Asignatura Profesor'}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formTeacher">
        <Form.Label>Profesor</Form.Label>
        <Form.Control
          as="select"
          value={newRow.nameTeacher}
          onChange={(e) => setNewRow({ ...newRow, nameTeacher: e.target.value })}
        >
          <option value="">{newRow.idSubjectTeacher?newRow.nameTeacher:"Seleccione un profesor"}</option>
          {teachers.map(teacher => (
            <option key={teacher.idTeacher} value={teacher.idTeacher}>
              {teacher.name}
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
          <option value="">{newRow.idSubjectTeacher?newRow.grade:"Seleccione un grado"}</option>
          {grades.map(grade => (
            <option key={grade.idDegree} value={grade.idDegree}>
              {grade.nameDegree}
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
          <option value="">{newRow.idSubjectTeacher?newRow.section:"Seleccione una sección"}</option>
          {sections.map(section => (
            <option key={section.idSection} value={section.idSection}>
              {section.nameSection}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formSubject">
        <Form.Label>Materia</Form.Label>
        <Form.Control
          as="select"
          value={newRow.subject}
          onChange={(e) => setNewRow({ ...newRow, subject: e.target.value })}
        >
          <option value=""> {newRow.idSubjectTeacher ? newRow.subject : "selecciona una materia"}</option>
          {subjects.map(subject => (
            <option key={subject.idStuff} value={subject.idStuff}>
             {subject.nameStuff}
            </option>
          ))}
        </Form.Control>å
      </Form.Group>

      <Form.Group controlId="formComments">
        <Form.Label>Comentarios</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Comentarios"
          value={newRow.comments}
          onChange={(e) => setNewRow({ ...newRow, comments: e.target.value })}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setModalIsOpen(false)}>Cancelar</Button>
    <Button variant="primary" onClick={newRow.idSubjectTeacher ? handleEdit : handleAdd}>
            {newRow.idSubjectTeacher ? 'Guardar Cambios' : 'Agregar'}</Button>
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
