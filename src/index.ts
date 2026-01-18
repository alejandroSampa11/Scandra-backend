import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Bienvenido al API de Scandra',
    status: 'running'
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api', router);

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada' 
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📍 Ambiente: ${process.env.NODE_ENV}`);
});