import { Router } from 'express';
import { addTask, getTask, updateTask, removeTask } from '../controlers';

const router = Router();





router.post('/', addTask); 

router.get('/', getTask);

router.put('/', updateTask);

router.delete('/', removeTask);


export { router };