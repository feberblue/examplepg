const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);
const cnxDb = process.env.MONGODB_URI;
// useNewUrlParser: true: no lanzar error por consola
mongoose.connect(cnxDb, {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.error("Error => " + error);
    } else {
        console.log("Conectando con MongoDb");
    }
}).then(db=>console.log("Conectado"))
.catch(err=>console.error(err));