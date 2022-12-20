import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addTask, getTask, updateTask } from '../controlers';

const router = Router();





router.post('/', addTask); 

router.get('/', getTask);

router.put('/', updateTask);




export { router };