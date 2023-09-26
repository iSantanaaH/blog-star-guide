"use client";
import Format from "@/layout/formatPages";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function FormLoginUser() {
  return (
    <Format>
      <section className="flex flex-col justify-center items-center">
        <Form
          action="http://localhost:3333/"
          method="post"
          className="flex flex-col justify-center items-center mt-32 py-5 bg-slate-200 rounded-2xl"
        >
          <div>
            <h2 className="font-bold text-4xl text-center pb-1">Login</h2>
          </div>
          <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" />
          </Form.Group>

          <Form.Group className="mb-3 sm:px-8" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="senha" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Logar
          </Button>
        </Form>
      </section>
    </Format>
  );
}

export default FormLoginUser;
