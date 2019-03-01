
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV !=='production')
    require('dotenv').config();
    
const app = require('./app');


app.listen(app.get('port'),()=>{
    console.log('Server on Port', app.get('port'));
});