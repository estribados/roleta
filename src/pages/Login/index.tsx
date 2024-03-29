import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useRef } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import * as Yup from "yup";

import { ButtonAnimated } from "components/Buttons";
import { Input } from "components/Form";
import Header from "components/Header";
import { Facebook, Google } from "components/Icons";
import { useAuth } from "hooks/useAuth";
import {
  AnimationContainer,
  Container,
  ContainerBg,
  Content,
} from "styles/login";
import getValidationErrors from "utils/getValidationErros";

import bg from "../../../public/images/caverna-tesouro.webp";

interface loginProps {
  email: string;
  password: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "painel/roleta",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { facebookAuth, googleAuth, emailAndPasswordAuth } = useAuth();

  const handleSubmit = useCallback(
    async (data: loginProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail valido"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await emailAndPasswordAuth({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
      }
    },
    [emailAndPasswordAuth]
  );
  return (
    <ContainerBg>
      <Image
        placeholder="empty"
        className="w-screen h-screen object-cover left-0 bg-fixed"
        src={bg}
        layout="fill"
        alt="logo do sistema"
        style={{ position: "fixed" }}
      />
      <Container>
        <Content className="mx-5">
          <AnimationContainer className="mx-5 glass px-5 py-2 rounded-lg">
            <div className="socialButtons text- w-full">
              <h5 className="mb-3 mt-3 l">Bem-Vindo(a)</h5>
              <div className="gap-5 w-full flex flex-col md:flex-row">
                <ButtonAnimated
                  onClick={() => googleAuth()}
                  textSize="text-sm"
                  style={{ letterSpacing: "0" }}
                >
                  <>
                    <Google size={28} />{" "}
                    <p className="text-sm">
                      Entrar com o <br /> Google
                    </p>
                  </>
                </ButtonAnimated>
                <ButtonAnimated
                  onClick={() => facebookAuth()}
                  textSize="text-sm"
                  style={{ letterSpacing: "0" }}
                >
                  <>
                    <Facebook size={30} />
                    <p className="text-sm">
                      Entrar com o <br /> Facebook
                    </p>
                  </>
                </ButtonAnimated>
              </div>
            </div>

            <span className="line">ou</span>

            <Form className="w-full" ref={formRef} onSubmit={handleSubmit}>
              <label htmlFor="email">
                <p className="text-gray-300 font-bold">Email</p>
                <Input
                  id="email"
                  name="email"
                  icon={FiMail}
                  placeholder="E-mail"
                />
              </label>

              <label htmlFor="password">
                <p className="text-gray-500 font-bold">Senha</p>
                <Input
                  id="password"
                  name="password"
                  icon={FiLock}
                  placeholder="Senha"
                  type="password"
                />
              </label>

              <div className="mt-5 w-full">
                <span className="cursor-pointer text-blue-500 mb-2 block text-sm w-full text-right font-bold">
                  Esqueceu a senha?
                </span>
                <ButtonAnimated>Fazer Login</ButtonAnimated>

                <p className="mt-2 block text-sm w-full text-left ">
                  Voce não tem conta ?
                  <Link legacyBehavior href="/Cadastro">
                    <a>
                      <span className="font-bold cursor-pointer text-blue-500 text-sm">
                        Cadastro
                      </span>
                    </a>
                  </Link>
                </p>
              </div>
            </Form>
          </AnimationContainer>
        </Content>
      </Container>
    </ContainerBg>
  );
};
export default Login;
