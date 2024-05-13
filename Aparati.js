import React, { useEffect, useState } from "react";
import { Table, Button, Form, ButtonGroup, Collapse } from "react-bootstrap";
import AparatiAxios from "../../apis/AparatiAxios";
import { useNavigate } from "react-router-dom";

const Aparati = () => {
 
  const [aparat, setAparat] = useState({})
  const [aparati, setAparati] = useState([])
  const [stanja, setStanja] = useState([])
  const [kategorije, setKategorije] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    getData();
  }, [])

  const getData = () => {
    getKategorije();
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

  const getKategorije = () => {
    AparatiAxios.get("/kategorije").then((result) => {
      setKategorije(result.data)
    }).catch(()=>{
      alert("Nije uspelo dobavljanje.");
    })
  }

  const goToEdit = (aparatId) => {
    navigate("/aparati/edit/" + aparatId);
  }

  const doDelete = (aparatId) => {
    AparatiAxios.delete("/aparati/" + aparatId)
      .then(()=>{
        getAparati();
      }).catch((error) => {
        alert("Nije uspelo brisanje.");
      })
  }

  return (
    <div>
      <h1>Aparati</h1>
      {/*Deo za ADD*/}

      <img className="img-fluid" src="home appliances.jpg" alt="mechanic"></img>
        {/*Deo za prikaz aparat-a*/}

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
                  {
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
                  </Button>]}
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
