import { TTask } from '../../types';
import { Request, Response } from 'express';
import * as yup from 'yup';

const tasks:TTask[] = [];

const taskValidations: yup.SchemaOf<TTask> = yup.object().shape({
  description: yup.string().required().min(3),
  dateCreated: yup.string().required().min(10),
  deadline: yup.string().required().min(10),
  status: yup.string().required(),
  dateCompleted: yup.string().min(10),
});



export const addTask = async (req: Request<TTask>, res: Response) => {
  
  try {
    await taskValidations.isValid(req.body) && {
      await: tasks.push(req.body)
    };
  } catch (error) {
    console.log(error);
  }

  console.log(tasks);
  return res.send('ok post');
};


export const getTask = async (req: Request, res: Response) => {
  
  try {
    return res.json(tasks);
  } catch (error) {
    console.log(error);
  }

  console.log(tasks);
  return res.send(tasks);
};