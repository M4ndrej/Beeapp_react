import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context/Context";
import axiosClient from "../axios/axios-client"; 

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUser, setToken } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Provera da li se lozinke poklapaju
    if (password !== passwordConfirmation) {
      setError("Lozinke se ne poklapaju.");
      return;
    }

    try {
      setError(null); // resetovanje greške
      const response = await axiosClient.post("/register", {
        name,
        email,
        password,
      });

      setUser(response.data.user);
      setToken(response.data.token);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError("Registracija nije uspela. Proverite podatke.");
    }
  };

  return (
    <div className="login_wrapper">
      <div className="login_form">
        <h2>Registracija</h2>
        <Form onSubmit={handleSubmit}>
          {error && <p className="text-danger">{error}</p>}

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Ime i prezime</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Unesite ime i prezime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Unesite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
            <Form.Label>Potvrda lozinke</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Potvrdite lozinku"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Potvrdi
          </Button>

          <p className="mt-3">
            Već imate nalog?{" "}
            <Link className="text-warning" to="/login">
              Prijavite se
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};
