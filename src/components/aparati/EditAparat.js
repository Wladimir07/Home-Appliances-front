import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AparatiAxios from "../../apis/AparatiAxios";

const EditAparat= () =>  {

  const [aparat, setAparat] = useState({})
  const [stanja, setStanja] = useState([])
  const [kategorije, setKategorije] = useState([])
  const navigate = useNavigate()
  const routeParams = useParams()

  useEffect(()=>{
    getData();
  }, [])

  const getData = () => {
    getKategorije();
    getStanja();
    getAparat();
  }

  const getAparat= () => {
    AparatiAxios.get("/aparati/" + routeParams.id)
      .then((result)=>{
        setAparat(result.data)
      }).catch(()=>{
        alert("Nije uspelo dobavljanje.");
      })
  }

  const getStanja = () => {
    AparatiAxios.get("/stanja")
      .then((result)=>{
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

  const doEdit = () => {
    AparatiAxios.put("/aparati/" + routeParams.id, aparat)
      .then(()=>{
        navigate("/aparati");
      }).catch(()=>{
        alert("Nije uspelo čuvanje.");
      })
  }

  const valueInputChange = (event) => {
    let editedAparat = {...aparat};

    const name = event.target.name;
    const value = event.target.value;

    editedAparat[name] = value;

    setAparat(editedAparat);
  }

  return (
    <div>
      <h1>Aparat</h1>

      <Form>
        <Form.Group>
          <Form.Label>Naziv</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="naziv"
            value={aparat.naziv}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tip</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="tip"
            value={aparat.tip}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Garancija ističe:</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="istekGarancije"
            value={aparat.istekGarancije}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cena</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="points"
            value={aparat.cena}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Garantni rok:</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="garantniRok"
            value={aparat.garantniRok}
            as="input"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Kategorija</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
            name="kategorijaId"
            value={aparat.kategorijaId}
            as="select"
          >
            <option value={-1}></option>
            {kategorije.map((kategorija) => {
              return (
                <option value={kategorija.id} key={kategorija.id}>
                  {kategorija.ime}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Stanje</Form.Label>
          <Form.Control
            onChange={(event) => valueInputChange(event)}
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
        <Button variant="primary" onClick={() => doEdit()}>
          Edit
        </Button>
      </Form>

    </div>
  );
}

export default EditAparat;
