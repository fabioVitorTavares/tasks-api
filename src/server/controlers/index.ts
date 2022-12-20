import { TTask } from '../../types';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { client } from '../database';



const taskValidations: yup.SchemaOf<TTask> = yup.object().shape({
  id: yup.number().required(),
  date: yup.string().required(),
  description: yup.string().required(),
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
        const date = req.query.date;
        const datas = await collection.findOne({date: date});
        const tasks = await datas?.tasks ?? []; 
        console.log(tasks);
        res.json(tasks);
        
      } catch (error) {
        return res.send('Error connect database: ');
      }
    });
  } catch (error) {
    return res.send('Err');
  }
};


export const updateTask = async (req: Request, res: Response) => {
  const { date, idTask, newStatus, dateCompleted } = req.body;

  try {
    client.connect(async () => {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME as string);

      const day = await collection.findOne({ date: date });
      const tasks = await day?.tasks;
      for (const task of tasks) {
        if (task.id == idTask) {
          task.status = newStatus;
          task.dateCompleted = dateCompleted;
        }
      }
      await collection.updateOne({ date: date }, { $set: { tasks: tasks } });
      res.send('Success update');
    });
  } catch (error) {
    console.log('Erro de conexão com o banco de dados!', error);    
  }
};

export const removeTask = async (req: Request, res: Response) => {
  const {date, idTask} = req.body;

  try {
    client.connect(async () => {
      const db = client.db(process.env.DB_NAME);
      const collection = db.collection(process.env.COLLECTION_NAME as string);
      const day = await collection.findOne({ date: date });      
      const oldTasks = await day?.tasks as TTask[];
      const newTasks = oldTasks.filter(task => task.id != idTask);      
      await collection.updateOne({ date: date }, { $set: { tasks: newTasks } });
      res.send('Task removed successfull');
    });
  } catch (error) {
    console.log('Erro de conexão com o banco de dados!', error);    
  }
};