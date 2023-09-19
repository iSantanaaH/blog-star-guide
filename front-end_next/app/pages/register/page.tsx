"use client";
import Format from "@/layout/format";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function FormLoginUser() {
  return (
    <Format>
      <section className="container flex flex-col justify-center items-center">
        <Form
          action="http://localhost:3333/"
          method="post"
          className="grid mt-32 py-5 w-2/4 bg-slate-200 rounded-2xl"
        >
          <div className="">
            <h2 className="font-bold text-4xl text-center pb-1">Registrar</h2>
          </div>
          <div className="grid grid-cols-2 flex-wrap justify-center">
            <div className="col-span-1">
              <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="nome" />
              </Form.Group>
            </div>
            <div className="col-span-1">
              <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control type="text" placeholder="sobrenome" />
              </Form.Group>
            </div>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="email" />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="tel" placeholder="telefone" />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="senha" />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicPassword">
              <Form.Label>Repita a senha</Form.Label>
              <Form.Control type="password" placeholder="repetir senha" />
            </Form.Group>
           
            
        
          </div>

          <div className="flex justify-center">
            <Button className="px-5" variant="primary" type="submit">
              Criar Conta
            </Button>
          </div>
        </Form>
      </section>
    </Format>
  );
}

export default FormLoginUser;
