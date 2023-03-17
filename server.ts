import express from "express";
import next from "next";
import cors from "cors";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Inicializa o servidor Express
app.prepare().then(() => {
  const server = express();

  // Adiciona o middleware CORS globalmente
  server.use(
    cors({
      origin: "*",
    })
  );

  // Redireciona todas as outras rotas para o Next.js
  server.all("*", (req: any, res: any) => {
    return handle(req, res);
  });

  // Inicia o servidor na porta 3000
  server.listen(3000, () => {
    console.log("> Ready on http://localhost:3000");
  });
});
