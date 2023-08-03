import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AparatiAxios from "../../apis/AparatiAxios";

const AddAparat= () =>  {

     //potrebno je zbog create-a
    const emptyAparat = {
      naziv: "",
      tip: "",
      istekGarancije: "",
      cena: 0.00,
      garantniRok: "",
      kategorijaId : -1,
      stanjeId: -1,
    }

    const [aparat, setAparat] = useState(emptyAparat)
    const [stanja, setStanja] = useState([])
    const [kategorije, setKategorije] = useState([])
  
    useEffect(()=>{
      getData();
    }, [])
  
    const getData = () => {
      getKategorije();
      getStanja();
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
  
    const doAdd = () => {
        AparatiAxios.post("/aparati/", aparat)
        .then(()=>{
          console.log('Pozdrav!')
          //bitno je da bi "resetovali" polja za kreiranje nakon kreiranja
          let aparat = {
            naziv: "",
            tip: "",
            istekGarancije: "",
            cena: 0.00,
            garantniRok: "",
            kategorijaId : -1,
            stanjeId: -1
          };
        }).catch(() =>{
          alert("Nije uspelo dodavanje.");
          console.log(aparat)
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
          <Form.Label>Kategorija</Form.Label>
          <Form.Control
            onChange={(event) => addValueInputChange(event)}
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
  
      </div>
    );
  }
  
  export default AddAparat;
  