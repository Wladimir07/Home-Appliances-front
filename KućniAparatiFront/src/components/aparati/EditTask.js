import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AparatiAxios from "../../apis/AparatiAxios";

const EditTask = () =>  {
  // constructor(props) {
  //   super(props);

  //   let task = {
  //     name: "",
  //     employee: "",
  //     points: 0,
  //     stateId: -1,
  //     sprintId: -1,
  //   };

  //   this.state = {
  //     task: task,
  //     sprints: [],
  //     states: []
  //   };
  // }

  const [task, setTask] = useState({})
  const [sprints, setSprints] = useState([])
  const [states, setStates] = useState([])
  const navigate = useNavigate()
  const routeParams = useParams()

  useEffect(()=>{
    getData();
  }, [])

  const getData = () => {
    getSprints();
    getStates();
    getTask();
  }

  const getTask = () => {
    AparatiAxios.get("/tasks/" + routeParams.id)
      .then((result)=>{
        setTask(result.data)
      }).catch(()=>{
        alert("Nije uspelo dobavljanje.");
      })
  }

  const getSprints = () => {
    AparatiAxios.get("/sprints")
      .then((result)=>{
        setSprints(result.data)
      }).catch(()=>{
        alert("Nije uspelo dobavljanje.");
      })
  }

  const getStates = () => {
    AparatiAxios.get("/states")
      .then((result)=>{
        setStates(result.data)
      }).catch(()=>{
        alert("Nije uspelo dobavljanje.");
      })
  }

  const doEdit = () => {
    AparatiAxios.put("/tasks/" + routeParams.id, task)
      .then(()=>{
        navigate("/tasks");
      }).catch(()=>{
        alert("Nije uspelo čuvanje.");
      })
  }

  const valueInputChange = (event) => {
    let editedTask = {...task};

    const name = event.target.name;
    const value = event.target.value;

    editedTask[name] = value;

    setTask(editedTask);
  }

  return (
    <div>
      <h1>Aparat</h1>

      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="name"
            value={task.name}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Employee</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="employee"
            value={task.employee}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Bodovi</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="points"
            value={task.points}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="stateId"
            value={task.stateId}
            as="select"
          >
            <option value={-1}></option>
            {states.map((state) => {
              return (
                <option value={state.id} key={state.id}>
                  {state.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sprint</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="sprintId"
            value={task.sprintId}
            as="select"
          >
            <option value={-1}></option>
            {sprints.map((sprint) => {
              return (
                <option value={sprint.id} key={sprint.id}>
                  {sprint.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={() => doEdit()}>
          Edit
        </Button>
      </Form>

    </div>
  );
}

export default EditTask;
