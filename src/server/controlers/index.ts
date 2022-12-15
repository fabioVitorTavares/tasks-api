import { TTask } from '../../types';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { client } from '../database';



const taskValidations: yup.SchemaOf<TTask> = yup.object().shape({
  id: yup.number().required(),
  date: yup.string().required(),
  description: yup.string().required().min(3),
  dateCreated: yup.string().required().min(10),
  deadline: yup.string().required().min(10),
  status: yup.string().required(),
  dateCompleted: yup.string()
});






export const addTask = async (req: Request<TTask>, res: Response) => {
  
  const task = req.body;
  console.log(task);

  client.connect(async () => {
    try {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME as string);
      const test = await collection.find({ date: task.date });
      const contentTest = await test.toArray();
      if (contentTest.length) {
        console.log('tem');
      }
      else {
        await collection.insertOne({
          date: task.date,
          tasks: [task]
        });               
      }

    } catch (error) {
      console.log('Erro de conexão com o banco de dados!', error);
    }
  });
  
    //       const collection = db.collection(process.env.COLLECTION_NAME as string);
    // const validTask = await taskValidations.isValid(req.body); 
    // console.log(validTask);
    
    // if (validTask) {
    //   client.connect(async () => {
    //     try {
    //       const db = client.db(process.env.DB_NAME);
    //       const collection = db.collection(process.env.COLLECTION_NAME as string);
    //       await collection.insertOne(doc);              
    //       console.log('Dado inserido');
    //     } catch (error) {
    //       console.log('Erro de conexão com o banco de dados!', error);
    //     }
    //   });
    // }
    // else {
    //   console.log('Invalid Task');    
    // }
 
  
    return res.send('ok post');
};


export const getTask = async (req: Request, res: Response) => {
  
  try {
    client.connect(async () => {
      try {
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.COLLECTION_NAME as string);
        console.log('aqui');
        const datas = await collection.find({});
        const tasks = await datas.toArray();
        console.log(tasks);
        res.json(tasks);
        
      } catch (error) {
        console.log('Erro de conexão com o banco de dados!', error);
      }
    });
  } catch (error) {
    console.log(error);
  }

};


