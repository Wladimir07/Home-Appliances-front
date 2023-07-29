import React, { useEffect, useState } from "react";
import { Table, Button, Form, ButtonGroup, Collapse } from "react-bootstrap";
import AparatiAxios from "../../apis/AparatiAxios";
import { useNavigate } from "react-router-dom";

const Aparati = () => {
  //potrebno je zbog create-a
  const emptyAparat = {
    naziv: "",
    tip: "",
    istekGarancije: "",
    cena: -1,
    garantniRok: "",
  }
  const [aparat, setAparat] = useState(emptyAparat)
  const [aparati, setAparati] = useState([])
  const [stanja, setStanja] = useState([])
  const [pageNo, setPageNo] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  useEffect(()=>{
    getData();
  }, [])

  const getData = () => {
    getStanja();
    getAparati();
  }


  const getAparati = () => {
    AparatiAxios.get("/aparati")
    .then((result)=>{
      console.log(result.data)
      setAparati(result.data)
    }).catch(()=>{
      alert("Nije uspelo dobavljanje.");
    })
  }

  const getStanja = () => {
    AparatiAxios.get("/stanja").then((result) => {
      setStanja(result.data)
    }).catch(()=>{
      alert("Nije uspelo dobavljanje.");
    })
  }

  const goToEdit = (aparatId) => {
    navigate("/aparati/edit/" + aparatId);
  }

  const doAdd = () => {
    AparatiAxios.post("/aparati/", aparat)
    .then(()=>{
      console.log(aparat)
      //bitno je da bi "resetovali" polja za kreiranje nakon kreiranja
      let aparat = {
        naziv: "",
        tip: "",
        istekGarancije: "",
        cena: -1,
        garantniRok: ""
      };
      setAparati(aparat)
      getAparati();
    }).catch(() =>{
      alert("Nije uspelo dodavanje.");
      console.log(aparat)
    })
  }

  const doDelete = (aparatId) => {
    AparatiAxios.delete("/aparati/" + aparatId)
      .then(()=>{
        var nextPage
        if(pageNo==totalPages-1 && aparati.length==1){
          nextPage = pageNo-1
        }else{
          nextPage = pageNo
        }
        getAparati(nextPage);
      }).catch((error) => {
        alert("Nije uspelo brisanje.");
      })
  }

  const addValueInputChange = (event) => {
    let newaparat = {...aparat}

    const name = event.target.name;
    const value = event.target.value;

    newaparat[name] = value
    setAparat(newaparat);
  }

  return (
    <div>
      <h1>Aparati</h1>
      {/*Deo za ADD*/}
      {window.localStorage['role']=="ROLE_ADMIN"?
      <Form>
        <Form.Group>
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="naziv"
            value={aparat.naziv}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tip</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="tip"
            value={aparat.tip}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Garancija ističe: </Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="istekGarancije"
            value={aparat.istekGarancije}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cena</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="cena"
            value={aparat.cena}
            as="input"
            type="number"
            min = "0"
            step = "1"
          ></Form.Control>
          <Form.Group>
          <Form.Label>Garantni rok: </Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="garantniRok"
            value={aparat.garantniRok}
            as="input"
          ></Form.Control>
        </Form.Group>
        </Form.Group>
        <Form.Group>
          <Form.Label>Stanje</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
            name="stanjeId"
            value={aparat.stanjeId}
            as="select"
          >
            <option value={-1}></option>
            {stanja.map((stanje) => {
              return (
                <option value={stanje.id} key={stanje.id}>
                  {stanje.opis}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={() => doAdd()}>
          Add
        </Button>
      </Form>:null}


        {/*Deo za prikaz aparat-a*/}
      <ButtonGroup style={{ marginTop: 25, float:"right"}}>
        <Button 
          style={{ margin: 3, width: 90}}
          disabled={pageNo==0} onClick={()=>getAparati(pageNo-1)}>
          Previous
        </Button>
        <Button
          style={{ margin: 3, width: 90}}
          disabled={pageNo==totalPages-1} onClick={()=>getAparati(pageNo+1)}>
          Next
        </Button>
      </ButtonGroup>

      <Table bordered striped style={{ marginTop: 5 }}>
        <thead className="thead-dark">
          <tr>
            <th>Naziv</th>
            <th>Tip</th>
            <th>Datum isteka garancije:</th>
            <th>Cena</th>
            <th>Preostali garantni rok:</th>
            <th colSpan={2}>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {aparati.map((aparat) => {
            return (
              <tr key={aparat.id}>
                <td>{aparat.naziv}</td>
                <td>{aparat.tip}</td>
                <td>{aparat.istekGarancije}</td>
                <td>{aparat.cena}</td>
                <td>{aparat.garantniRok}</td>
                <td>
                  {window.localStorage['role']=="ROLE_ADMIN"?
                  [<Button
                    variant="warning"
                    onClick={() => goToEdit(aparat.id)}
                    style={{ marginLeft: 5 }}
                  >
                    Edit
                  </Button>,

                  <Button
                    variant="danger"
                    onClick={() => doDelete(aparat.id)}
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
    </div>
  );
}

export default Aparati
