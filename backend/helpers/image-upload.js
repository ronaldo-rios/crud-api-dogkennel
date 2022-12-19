
const multer = require('multer');
const path = require('path');

//Destinatin for store images:
const imageStorage = multer.diskStorage({
    destination: function(request, file, callback){

        let folder =""

        if(request.baseUrl.includes("users")){
            folder = "users"
        } else if(request.baseUrl.includes("pets")){
            folder = "pets"
        }

        callback(null, `public/images/${folder}`)
    },
    filename: function(request, file, callback){
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(require, file, callback){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return callback(new Error("Envie apenas JPG ou PNG!"))
        }
        callback(undefined, true)
    }
    
})


module.exports = {imageUpload}