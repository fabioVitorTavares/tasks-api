import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
const router = Router();




router.get('/', (req, res) => {  

  return res.status(StatusCodes.OK).send('get');
});

router.post('/', (req, res) => {  
  
  return res.status(StatusCodes.OK).send('post');
});


router.delete('/', (req, res) => {  
  
  return res.status(StatusCodes.OK).send('delete');
});




export { router };