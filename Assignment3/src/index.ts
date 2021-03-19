import http from 'http';
import express from 'express';
import { userRouter } from './routes/userRoute';
import bodyParser from 'body-parser';
import path from 'path';
import { homedir } from 'os';
import { postRouter } from './routes/postRoute';
var methodOverride = require('method-override');
let app = express();

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({extended: true})); //recieve bodyparser from html form
app.use(bodyParser.json()); //recieve bodyparser from json request

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/Users',userRouter);//at 'localhost:3000/Users' reads the userRoute.ts file
app.use('/Posts',postRouter);
app.get('/',(req, res, next)=> {
    res.sendFile(path.join(process.cwd()+'/public/html/index.html'));
});


app.listen(3000);

