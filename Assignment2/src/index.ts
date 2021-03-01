import http from 'http';
import express from 'express';
import { userRouter } from './routes/userRoute';
import bodyParser from 'body-parser';
import path from 'path';
import { homedir } from 'os';
var methodOverride = require('method-override');
let app = express();

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended: true})); //recieve bodyparser from html form
app.use(bodyParser.json()); //recieve bodyparser from json request

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/User',userRouter);//at 'localhost:3000/User' reads the userRoute.ts file
app.get('/',(req, res, next)=> {
    res.sendFile(path.join(process.cwd()+'/public/html/index.html'));
});
app.listen(3000);

