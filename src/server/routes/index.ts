import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addTask, getTask } from '../controlers';

const router = Router();





router.post('/', addTask); 

router.get('/', getTask);


router.delete('/', (req, res) => {  
  
  return res.status(StatusCodes.OK).send('delete');
});




export { router };