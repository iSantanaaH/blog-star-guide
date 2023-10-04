"use client";

import Format from "@/layout/format";
import axios from "axios";
import Link from "next/link";
import React, { useState, SyntheticEvent, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function FormUserRegisterAccount() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstLetterUppercaseName, setfirstLetterUppercaseName] = useState("");
  const [firstLetterUppercaseSurname, setfirstLetterUppercaseSurname] =
    useState("");
  const [phone, setPhone] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  function changefirstLetterUppercaseName(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = event.target.value;

    const capitalizedValue =
      newValue.charAt(0).toUpperCase() + newValue.slice(1);

    setfirstLetterUppercaseName(capitalizedValue);
  }

  function changefirstLetterUppercaseSurname(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const newValue = event.target.value;

    const capitalizedValue =
      newValue.charAt(0).toUpperCase() + newValue.slice(1);

    setfirstLetterUppercaseSurname(capitalizedValue);
  }

  function notifySuccesCreateUser() {
    toast("Sucesso ao criar usuário!");
  }

  function notifyErrorCreateUser() {
    toast.error("O email já foi cadastrado");
  }

  function removeSpecialCharacters(value: string) {
    return value.replace(/\D/g, "");
  }

  function changeInputPhone(event: React.ChangeEvent<HTMLInputElement>) {
    const newPhone = removeSpecialCharacters(event.target.value);
    setPhone(newPhone);
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

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

      console.log(response.status);

      if (response.status === 200) {
        formRef.current?.reset();
        notifySuccesCreateUser();

        setTimeout(() => {
          window.location.href = "/pages/login";
        }, 3000);
      } else {
        notifyErrorCreateUser();
      }
    } catch (error: any) {
      console.error("Erro do catch:", error.erro);
    } finally {
      setIsLoading(false);
    }
  }

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
                placeholder="email"
                name="email"
                required
                minLength={10}
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
                onChange={changeInputPhone}
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