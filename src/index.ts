import { server } from './server/server';


export default server.listen(process.env.PORT || 5441, () => console.log('App rodando'));



