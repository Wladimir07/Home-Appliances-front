import React, { useEffect, useState } from "react";
import { Table, Button, Form, ButtonGroup, Collapse } from "react-bootstrap";
import AparatiAxios from "../../apis/AparatiAxios";
import { useNavigate } from "react-router-dom";

const Aparati = () => {
  //potrebno je zbog create-a
  const emptyTask = {
    name: "",
    employee: "",
    points: "",
    sprintId: -1,
  }
  const [task, setTask] = useState(emptyTask)
  const [tasks, setTasks] = useState([])
  const [sprints, setSprints] = useState([])
  const [search, setSearch] = useState({ taskName: "", sprintId: -1})
  const [showSearch, setShowSearch] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [sprintSum, setSprintSum] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    getData();
  }, [])

  const getData = () => {
    getSprints();
    getTasks(0);
  }

  const getTasks = (page) => {
    let config = { params: {
      pageNo: page
    } };

    //Sledeca 2 if-a su tu zbog search-a
    if (search.taskName != "") {
      config.params.taskName = search.taskName;
    }

    if (search.sprintId != -1) {
      config.params.sprintId = search.sprintId;
    }

    AparatiAxios.get("/aparati", config)
    .then((result)=>{
      const sprintSum = result.headers["sprint-total"]?result.headers["sprint-total"]:"";
      setPageNo(page)
      setTasks(result.data)
      setTotalPages(result.headers["total-pages"])
      setSprintSum(sprintSum)
    }).catch(()=>{
      alert("Nije uspelo dobavljanje.");
    })
  }

  const getSprints = () => {
    AparatiAxios.get("/sprints").then((result) => {
      setSprints(result.data)
    }).catch(()=>{
      alert("Nije uspelo dobavljanje.");
    })
  }

  const goToEdit = (taskId) => {
    navigate("/aparati/edit/" + taskId);
  }

  const doAdd = () => {
    AparatiAxios.post("/aparati/", task)
    .then(()=>{
      //bitno je da bi "resetovali" polja za kreiranje nakon kreiranja
      let task = {
        name: "",
        employee: "",
        points: "",
        sprintId: -1,
      };
      setTask(task)
      getTasks(0);
    }).catch(() =>{
      alert("Nije uspelo dodavanje.");
    })
  }

  const doDelete = (taskId) => {
    AparatiAxios.delete("/aparati/" + taskId)
      .then(()=>{
        var nextPage
        if(pageNo==totalPages-1 && tasks.length==1){
          nextPage = pageNo-1
        }else{
          nextPage = pageNo
        }
        getTasks(nextPage);
      }).catch((error) => {
        alert("Nije uspelo brisanje.");
      })
  }

  const addValueInputChange = (event) => {
    let newTask = {...task}

    const name = event.target.name;
    const value = event.target.value;

    newTask[name] = value
    setTask(newTask);
  }

  const searchValueInputChange = (event) => {
    let newSearch = {...search}

    const name = event.target.name;
    const value = event.target.value;

    newSearch[name] = value
    setSearch(newSearch);
  }

  const doSearch = () => {
    getTasks(0);
  }

  const canCreateTask = () => {
    return task.name!="" && 
      (task.points!="" && task.points>=0 && task.points<=20 && task.points%1==0)
       && task.sprintId != -1
  }

  const changeState = (taskId) => {
      AparatiAxios.post(`/aparati/${taskId}/change_state`)
      .then((ret)=>{
        tasks.forEach((element, index) => {
          if (element.id === taskId) {
            tasks.splice(index, 1, ret.data);
            setTasks([...tasks]);
          }
        });
      }).catch(()=>{
        alert("Nije moguće promeniti stanje.");
      })
  }

  return (
    <div>
      <h1>Tasks</h1>
      {/*Deo za ADD*/}
      {window.localStorage['role']=="ROLE_ADMIN"?
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="name"
            value={task.name}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Employee</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="employee"
            value={task.employee}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Points</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="points"
            value={task.points}
            as="input"
            type="number"
            min = "0"
            step = "1"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sprint</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
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
        <Button disabled = {!canCreateTask()} variant="primary" onClick={() => doAdd()}>
          Add
        </Button>
      </Form>:null}

      {/*Deo za Search*/}
      <Form.Group style={{marginTop:35}}>
        <Form.Check type="checkbox" label="Show search form" onClick={(event) => setShowSearch(event.target.checked)}/>
      </Form.Group>
      <Collapse in={showSearch}>
      <Form style={{marginTop:10}}>
        <Form.Group>
          <Form.Label>Ime zadatka</Form.Label>
          <Form.Control
            value={search.taskName}
            name="taskName"
            as="input"
            onChange={(e) => searchValueInputChange(e)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sprint</Form.Label>
          <Form.Control
            onChange={(event) => searchValueInputChange(event)}
            name="sprintId"
            value={search.sprintId}
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
        <Button onClick={() => doSearch()}>Search</Button>
      </Form>
      </Collapse>

        {/*Deo za prikaz Task-a*/}
      <ButtonGroup style={{ marginTop: 25, float:"right"}}>
        <Button 
          style={{ margin: 3, width: 90}}
          disabled={pageNo==0} onClick={()=>getTasks(pageNo-1)}>
          Previous
        </Button>
        <Button
          style={{ margin: 3, width: 90}}
          disabled={pageNo==totalPages-1} onClick={()=>getTasks(pageNo+1)}>
          Next
        </Button>
      </ButtonGroup>

      <Table bordered striped style={{ marginTop: 5 }}>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Employees</th>
            <th>Points</th>
            <th>State</th>
            <th>Sprint</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.employee}</td>
                <td>{task.points}</td>
                <td>{task.stateName}</td>
                <td>{task.sprintName}</td>
                <td>
                  <Button
                    disabled={task.stateId === 3}
                    variant="info"
                    onClick={() => changeState(task.id)}
                  >
                    Change State
                  </Button>
                  {window.localStorage['role']=="ROLE_ADMIN"?
                  [<Button
                    variant="warning"
                    onClick={() => goToEdit(task.id)}
                    style={{ marginLeft: 5 }}
                  >
                    Edit
                  </Button>,

                  <Button
                    variant="danger"
                    onClick={() => doDelete(task.id)}
                    style={{ marginLeft: 5 }}
                  >
                    Delete
                  </Button>]:null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h2 hidden={sprintSum == ""}>Suma bodova za sprint je {sprintSum}</h2>
    </div>
  );
}

export default Aparati
