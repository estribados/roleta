import dynamic from "next/dynamic";
import Image from "next/image";

import { ButtonMP } from "components/Buttons";
import { Container, Content } from "styles/home";

import bg from "../../public/images/caverna-home.webp";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/Roullete"),
  { ssr: false }
);

export default function Home() {
  return (
    <Container className="flex items-center justify-center">
      <Image
        placeholder="blur"
        className="w-screen object-cover   h-full"
        src={bg}
        layout="fill"
        alt="logo do sistema"
        style={{ position: "fixed" }}
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
            <ButtonMP animation>COMPRAR CREDITOS</ButtonMP>
          </div>
        </section>
      </Content>
    </Container>
  );
}
