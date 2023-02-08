import dynamic from "next/dynamic";
import Image from "next/image";

import { ButtonMP } from "components/Buttons";
import Header from "components/Header";
import { Container, Content } from "styles/home";
import { staticData } from "utils/staticRoullete";

import bg from "../../public/images/caverna-home.webp";
import api from "services/api";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/Roullete"),
  { ssr: false }
);

export default function Home() {
  const algoritmo = () => {
    api.post("users/alg");
  };

  return (
    <Container className="flex items-center justify-center">
      <Image
        placeholder="blur"
        className="w-screen h-full object-cover left-0 bg-fixed"
        src={bg}
        layout="fill"
        alt="logo do sistema"
        style={{ minHeight: "100vh" }}
      />
      <Content className="relative">
        <div className="containerRoullete ">
          <DynamicComponentWithNoSSR staticItens />
        </div>
        <section className="">
          <h1>
            Começe a ganhar <br />
            <a href="">AGORA !</a>
          </h1>
          <div className="mb-8 md:mb-0">
            {/* <button className='btn' onClick={algoritmo}>testar</button> */}
            <ButtonMP animation>COMPRAR CREDITOS</ButtonMP>
          </div>
        </section>
      </Content>
    </Container>
  );
}
