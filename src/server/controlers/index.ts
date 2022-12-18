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

  const task = {
    id: Math.random(),
    ...req.body,
  };

  const validTask = await taskValidations.isValid(task);

  if (validTask) {
  
   

    client.connect(async () => {
      try {
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.COLLECTION_NAME as string);
        const documentDay = collection.find({ date: task.date });
        const documentDayArray = await documentDay.toArray();
        if (documentDayArray.length) {          
          const documentTasksArray = await documentDayArray[0].tasks;
          documentTasksArray.push(task);
          await collection.updateOne({
            date: task.date
          }, {
            $set: { tasks: documentTasksArray }
          });
        }
        else {
          await collection.insertOne({
            date: task.date,
            tasks: [task]
          });          
        }
        return res.send('Task adding successfully');
      } catch (error) {
        console.log('Erro de conexão com o banco de dados!', error);
      }
    });
  }
  else {    
    return res.send('Invalid Task');
  }
};


export const getTask = async (req: Request, res: Response) => {
  
  try {
    client.connect(async () => {
      try {
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection(process.env.COLLECTION_NAME as string);
        
        const datas = await collection.findOne({date: req.body.date});
        const tasks = await datas?.tasks;     
        res.json(tasks);
        
      } catch (error) {
        console.log('Erro de conexão com o banco de dados!', error);
      }
    });
  } catch (error) {
    console.log(error);
  }

};


