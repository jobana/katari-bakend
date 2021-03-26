import * as mongoose from "mongoose";

const db = mongoose.connection
//let uriLcocal = 'mongodb://localhost/dev_luis';
let uri = process.env.MONGODB_URI;
if (!uri) {
    console.log("No existe uri para conectar");
    process.exit(1);
}else{
    mongoose.connect(uri, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    db.on('error', (err) => console.log(new Error(err)))
    db.once('open', () => console.log('MongoDB is running...'))
}
