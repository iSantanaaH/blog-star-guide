"use client";

import Format from "@/layout/format";
import axios from "axios";
import Link from "next/link";
import React, { useState, SyntheticEvent, useRef, use } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function FormUserRegisterAccount() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstLetterUppercaseName, setfirstLetterUppercaseName] = useState("");
  const [firstLetterUppercaseSurname, setfirstLetterUppercaseSurname] =
    useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleChangeRegexEmail(event: React.ChangeEvent<HTMLInputElement>) {
    const newEmail = event.target.value;
    setEmail(newEmail);
  }

  function changefirstLetterUppercaseName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = event.target.value;
  
    const capitalizedValue = newValue
      .split(" ") // Divide o nome em partes usando o espaço como separador
      .map(part => part.charAt(0).toUpperCase() + part.slice(1)) // Capitaliza a primeira letra de cada parte
      .join(" "); // Junta as partes novamente com espaços
  
    setfirstLetterUppercaseName(capitalizedValue);
  }
  

  function changefirstLetterUppercaseSurname(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = event.target.value;
  
    const wordsToExclude = new Set(["das", "da", "do", "dos", "de", "des", "di", "dis", "dus", "du"]);
  
    const parts = newValue.split(" ");
    const capitalizedParts = parts.map((part, index) => {
      if (index === 0 || !wordsToExclude.has(part.toLowerCase())) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      } else {
        return part;
      }
    });
  
    const capitalizedValue = capitalizedParts.join(" ");
  
    setfirstLetterUppercaseSurname(capitalizedValue);
  }

  function notifySuccesCreateUser() {
    toast("Sucesso ao criar usuário!");
  }

  function notifyErrorCreateUser(message: string) {
    toast.error(`Erro: ${message}`);
  }

  function removeSpecialCharacters(value: string) {
    return value.replace(/\D/g, "");
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const inputPhoneValue = (event.currentTarget as HTMLFormElement)["phone"]
      .value;
    const formatPhone = removeSpecialCharacters(inputPhoneValue);
    setPhone(formatPhone);
    const nameValue = firstLetterUppercaseName.trim();
    const surnameValue = firstLetterUppercaseSurname.trim();
    const phoneValue = phone.trim();
    const emailValue = (event.currentTarget as HTMLFormElement)[
      "email"
    ].value.trim();
    const passwordValue = (event.currentTarget as HTMLFormElement)[
      "password"
    ].value.trim();
    const birthdayValue = (event.currentTarget as HTMLFormElement)["birthday"]
      .value;

    const minLengthName = 3;
    const minLengthSurname = 3;
    const minLengthPhone = 11;
    const minLengthEmail = 10;
    const minLengthPassword = 8;
    const minAge = 5;
    const birthdayDate = new Date(birthdayValue);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthdayDate.getFullYear();

    if (
      nameValue === "" ||
      surnameValue === "" ||
      phoneValue === "" ||
      emailValue === "" ||
      passwordValue === "" ||
      nameValue.length < minLengthName ||
      surnameValue.length < minLengthSurname ||
      phoneValue.length < minLengthPhone ||
      emailValue.length < minLengthEmail ||
      passwordValue.length < minLengthPassword ||
      birthdayValue.length < minAge
    ) {
      toast.error(
        "Alguns campos estão vazios ou não possuem a quantidade mínima de caracteres"
      );
      return;
    }

    if (age < minAge) {
      toast.error(
        "Você deve ter pelo menos 5 anos de idade para criar uma conta"
      );
      return;
    }

    if (!emailRegex.test(emailValue)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);

      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const response = await axios.post(
        "http://localhost:3333/register",
        formDataObject,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        // formRef.current?.reset();
        setfirstLetterUppercaseName("");
        setfirstLetterUppercaseSurname("");
        setPhone("");
        setEmail("");
        notifySuccesCreateUser();

        // setTimeout(() => {
        //   window.location.href = "/pages/login";
        // }, 3000);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        if (error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
          notifyErrorCreateUser(errorMessage);
        }
      } else if (error.response && error.response.status === 404) {
        if (error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;
          notifyErrorCreateUser(errorMessage);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    let formattedValue = "";
    if (cleanedValue.length >= 2) {
      formattedValue = `(${cleanedValue.slice(0, 2)}`;
      if (cleanedValue.length >= 7) {
        formattedValue += `) ${cleanedValue.slice(2, 7)}`;
        if (cleanedValue.length >= 11) {
          formattedValue += `-${cleanedValue.slice(7, 11)}`;
        } else {
          formattedValue += `-${cleanedValue.slice(7)}`;
        }
      } else {
        formattedValue += `) ${cleanedValue.slice(2)}`;
      }
    } else {
      formattedValue = cleanedValue;
    }

    setPhone(formattedValue);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;
    const cleanedPhone = newPhone.replace(/\D/g, "");
    formatPhoneNumber(cleanedPhone);

    event.target.maxLength = 15;
  };

  return (
    <Format>
      <section className="flex flex-col justify-center items-center mx-auto">
        <div className="containerNotify">
          <ToastContainer />
        </div>
        <form
          method="POST"
          onSubmit={handleSubmit}
          ref={formRef}
          className="flex flex-col md:w-3/5 lg:w-2/6 sml:w-5/6 sml:p-4 items-center m-32 py-5 bg-slate-200 rounded-2xl"
        >
          <div className="">
            <h2 className="font-bold text-4xl text-center pb-3">Registre-se</h2>
            <button onClick={() => {notifyErrorCreateUser}}>Teste</button>
          </div>
          <div className="grid grid-cols-2 sml639:grid-cols-1 sml639:p-7 sml:grid-cols-1 flex-wrap justify-center">
            <div className="col-span-1">
              <div className="mb-3 sm:px-8" id="controlName">
                <label>Nome</label>
                <input
                  className="input-forms"
                  value={firstLetterUppercaseName}
                  onChange={changefirstLetterUppercaseName}
                  type="text"
                  placeholder="nome"
                  name="name"
                  minLength={3}
                  required
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-3 sm:px-8" id="controlSurname">
                <label>Sobrenome</label>
                <input
                  className="input-forms"
                  value={firstLetterUppercaseSurname}
                  onChange={changefirstLetterUppercaseSurname}
                  type="text"
                  placeholder="sobrenome"
                  name="surname"
                  minLength={3}
                  required
                />
              </div>
            </div>
            <div className="mb-3 sm:px-8" id="controlEmail">
              <label>Email</label>
              <input
                className="input-forms"
                type="email"
                placeholder="example@gmail.com"
                name="email"
                value={email}
                required
                minLength={10}
                onChange={handleChangeRegexEmail}
              />
            </div>
            <div className="mb-3 sm:px-8" id="controlPhone">
              <label>Telefone</label>
              <input
                className="input-forms"
                type="tel"
                placeholder="(99)99999-9999"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                minLength={11}
                maxLength={11}
                required
              />
            </div>
            <div className="mb-3 sm:px-8" id="controlPassword">
              <label>Senha</label>
              <input
                className="input-forms"
                type="password"
                placeholder="senha"
                name="password"
                required
                minLength={8}
              />
              <span className="text-slate-500 text-sm ml-2">
                mínimo 8 caracteres
              </span>
            </div>
            <div className="mb-3 sm:px-8" id="controlBirthday">
              <label>Data de nascimento</label>
              <input
                className="input-forms"
                type="date"
                name="birthday"
                required
                max={"9999-12-31"}
                min={"1000-01-01"}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button className="button-form pt-4 sml:mt-3" type="submit">
              Criar Conta
            </button>
            <span className="py-2 sml:pt-3">
              Já tem conta?{" "}
              <Link
                className="text-base text-blue-800 hover:text-blue-700"
                href={"/pages/login"}
              >
                Faça login
              </Link>
            </span>
          </div>
        </form>
      </section>
    </Format>
  );
}

export default FormUserRegisterAccount;
