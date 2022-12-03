import { server } from './server/server';

server.listen(process.env.PORT || 5441, () => console.log('App rodando'));