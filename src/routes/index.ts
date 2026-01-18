import express from 'express';
import userRoutes from './user.routes'
const router = express.Router();

router.use('/users', userRoutes);
// Importa aquí tus rutas específicas
// import userRoutes from './userRoutes';

// Usa las rutas
// router.use('/users', userRoutes);

export default router;