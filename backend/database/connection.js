const mongoose = require('mongoose');

async function main(){

    await mongoose.connect('mongodb://localhost:27017/dogkennel');
    console.log("Conectado ao Mongoose.");
    
}

main().catch((error) => console.log(`Erro com conexão no banco de dados: ${error}`));



module.exports = mongoose