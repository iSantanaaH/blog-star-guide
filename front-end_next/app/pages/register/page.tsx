"use client";
import Format from "@/layout/format";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function FormLoginUser() {
  const [messageSucessCreateUser, setMessageSucessCreateUser] = useState('');

  useEffect(() => {
    if (messageSucessCreateUser) {
      alert(messageSucessCreateUser);
      window.location.href = '/';
    }
  }, [messageSucessCreateUser]);

  const handleSubmitFormCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('http://localhost:3333/register', {
        method: 'POST',
        body: formData,
      });

      if(response.ok) {
        const data = await response.json();
        setMessageSucessCreateUser(data.messageSucessCreateUser);
      } else {
        alert('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação', error);
    }
  };

  return (
    <Format>
      <section className="container flex flex-col justify-center items-center">
        <Form
          action="http://localhost:3333/register"
          method="post"
          onSubmit={handleSubmitFormCreateUser}
          className="grid mt-32 py-5 w-2/4 bg-slate-200 rounded-2xl"
        >
          <div className="">
            <h2 className="font-bold text-4xl text-center pb-1">Registrar</h2>
          </div>
          <div className="grid grid-cols-2 flex-wrap justify-center">
            <div className="col-span-1">
              <Form.Group className="mb-3 sm:px-8" controlId="formBasicNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="nome" name="name" required />
              </Form.Group>
            </div>
            <div className="col-span-1">
              <Form.Group className="mb-3 sm:px-8" controlId="formBasicSobrenome">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control type="text" placeholder="sobrenome" name="surname" required />
              </Form.Group>
            </div>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="email" name="email" required />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicTelefone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control type="tel" placeholder="telefone" name="phone" required />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" placeholder="senha" name="password" required />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="formBasicRepetirSenha">
              <Form.Label>Repita a senha</Form.Label>
              <Form.Control type="password" placeholder="repetir senha" name="repeatPassword" required />
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
