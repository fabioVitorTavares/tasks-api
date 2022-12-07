import { client } from './server/database';
import { server } from './server/server';
import { TDay } from './types';


server.listen(process.env.PORT || 5441, () => console.log('App rodando'));

client.connect(async () => {
  try {
    const db = client.db(process.env.DB_NAME);    
    console.log('Banco ok');
  } catch (error) {
    console.log('Erro de conexão com o banco de dados!', error);  
  } finally {
    await client.close();
  }
});