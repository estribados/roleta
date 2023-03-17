import Cors from "cors";

// Inicializa o middleware CORS
const cors = Cors({
  methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"],
  origin: "*",
});

// Função de middleware
export default function middle(req: any, res: any, next: any) {
  // Habilita o CORS para todas as rotas
  cors(req, res, next);
}
