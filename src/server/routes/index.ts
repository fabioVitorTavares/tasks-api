import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = Router();


router.post('/', (req, res) => {
  const dados = {
    'chaver': 'valor'
  };



  return res.status(StatusCodes.CREATED).json(JSON.stringify(dados));
});



export { router };