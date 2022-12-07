import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addTask, getTask } from '../controlers';

const router = Router();





router.post('/', addTask); 

router.get('/', getTask);






export { router };