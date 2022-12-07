import { TTask } from '../../types';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { client } from '../database';

const tasks:TTask[] = [];

const taskValidations: yup.SchemaOf<TTask> = yup.object().shape({
  description: yup.string().required().min(3),
  dateCreated: yup.string().required().min(10),
  deadline: yup.string().required().min(10),
  status: yup.string().required(),
  dateCompleted: yup.string().min(10),
});






export const addTask = async (req: Request<TTask>, res: Response) => {
  const task = req.body;
  const doc = { '06/12/2022': task };
  try {
    const validTask = await taskValidations.isValid(req.body); 
    console.log(validTask);
    
    if (validTask) {
      client.connect(async () => {
        try {
          const db = client.db(process.env.DB_NAME);
          const collection = db.collection(process.env.COLLECTION_NAME as string);
          await collection.insertOne(doc);              
          console.log('Dado inserido');
        } catch (error) {
          console.log('Erro de conexão com o banco de dados!', error);
        }
      });
    }
    else {
      console.log('Invalid Task');    
    }
 
  } catch (error) {
    console.log(error);
  }

  console.log(doc);
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