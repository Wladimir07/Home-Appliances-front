import React, { useState } from "react";
import { Form, Button, Row, Col} from "react-bootstrap";

import {login} from '../../services/auth';

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Row className="justify-content-center">
      <Col md={6}>        
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" onChange = {(e) => setUsername(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange = {(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="success" onClick={() => {login(username, password)}}>Log in</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
