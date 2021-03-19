import express, { Request, Response } from "express";
import { Users } from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Posts, postArray } from "../models/posts";

const userRouter = express.Router();

let userArray: Users[] = [];
userArray.push(new Users("jsnow", "Jon", "Snow", "jsnow@gmail.com", "12345"));
userArray.push(new Users("kzoldyk", "Killua", "Zoldyck", "kzoldyk@gmail.com", "abcde"));
userArray.push(new Users("pmcCartney", "Paul", "McCartney", "pmccartney@gmail.com", "123abc"));

userRouter.get("/", (req, res, next) => {
  //get request for 'localhost(3000)/Users/
  res.status(200).send(userArray); //200 OK success status
});

userRouter.post("/", (req, res, next) => {
  //post request for 'localhost(3000)/Users/
  if(req.body.userId && req.body.firstName && req.body.lastName && req.body.emailAddress && req.body.password && validateEmail(req.body.emailAddress)===true)
  {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            let newUser = userArray.find(u=>u.userId.toLowerCase()===req.body.userId.toLowerCase());
            if(newUser!=undefined)
            {
                res.status(409).send({message:'Duplicate userId', status:409});
            }
            else if(req.body.userId && req.body.firstName && req.body.lastName && req.body.emailAddress)
            {
                newUser = new Users(req.body.userId, req.body.firstName, req.body.lastName, req.body.emailAddress, hash);
                userArray.push(newUser);
            }
            res.status(201).send(userArray[userArray.length - 1]); //201 created success status
        });
    });
    }else{
        res.status(406).send({message:'Please enter data in all fields and be sure that email is in the correct format.'});
    }
});

userRouter.patch("/:userId", (req, res, next) => {
  //patch request for 'localhost(3000)/Users/{id}
  if(req.headers.token){ //truthy (if the token exists .. do this:)
    if(validateEmail(req.body.emailAddress)===true){
        try{
            let tokenPayload = jwt.verify(req.headers.token.toString(), 'vnjdbbviwd') as {userId:number, firstName:string, exp:number};
            console.log(tokenPayload);
            if (tokenPayload.userId.toString() === req.params.userId){
                let foundUser = findUser(req, res);
                if(foundUser!==undefined)
                {
                    foundUser.firstName = req.body.firstName;
                    foundUser.lastName = req.body.lastName;
                    foundUser.emailAddress = req.body.emailAddress;
                    foundUser.password = req.body.password;
                }
                res.status(200).send(foundUser);
            }else{
                res.status(401).send({ message: `You can only update this user if you are logged in as this user.` });
            }
        }catch (ex){ //invalid token
            console.log(ex);
            res.status(401).send({ message: 'Invalid token.' });
        }
    }else{
        res.status(406).send({message:'Email is not in the correct format.'});
    }
    }else{
        res.status(401).send({ message: 'Missing authorization header.' });
    }
});

userRouter.get("/:userId", (req, res, next) => {
  //get request for 'localhost(3000)/Users/{id}
  let foundUser = findUser(req,res);
  if(foundUser)
      res.status(200).send(foundUser);
  else
    res.status(404).send({ message: `User with id ${req.params.userId} was not found.` });
});
userRouter.delete("/:userId", (req, res, next) => {
  //delete request for 'localhost(3000)/Users/{id}
  if(req.headers.token){ //truthy (if the token exists .. do this:)
    try{
        let tokenPayload = jwt.verify(req.headers.token.toString(), 'vnjdbbviwd') as {userId:number, firstName:string, exp:number};
        console.log(tokenPayload);
        if (tokenPayload.userId.toString() === req.params.userId){
            let user = findUser(req,res);
            if(user) {
                userArray.splice(userArray.findIndex(u=>u.userId===user?.userId), 1);
                res.status(200).send({ message: `User with id ${req.params.userId} has been deleted.` });
            }
            else{
                res.status(404).send({ message: `User with id ${req.params.userId} was not found.` });
            }
        }else{
            res.status(401).send({ message: `You can only delete this user if you are logged in as this user.` });
        }

    }
    catch (ex){ //invalid token
        console.log(ex);
        res.status(401).send({ message: 'Invalid token.' });
    }
    }else{
        res.status(401).send({ message: 'Missing authorization header.' });
    }
});
userRouter.get('/Posts/:userId', (req, res, next) =>{
    let foundUser = findUser(req,res);
    let userPosts: Posts|undefined = postArray.find(u=>u.userId.toString()===foundUser?.userId);

    if(foundUser)
        res.status(200).send(userPosts);
    else
      res.status(404).send({ message: `User with id ${req.params.userId} was not found.` });
});
userRouter.get('/:userId/:password', (req, res, next) => {
    let user = userArray.find(u=>u.userId.toString()===req.params.userId);
    if(user!=undefined){
        console.log(req.params.password);
        console.log(user.password.toString());

        bcrypt.compare(req.params.password, user.password.toString(), function(err, result) {
            // result == true
            if(result){
                let token = jwt.sign({userId: user?.userId, firstName: user?.firstName}, 'vnjdbbviwd', {expiresIn:500});
                res.send(token);
            }else{
                res.status(401).send({ message: `Invalid userId and password.` });
            }
        });
        
    }else{
        res.status(404).send({ message: `User entered was not found.`});
    }
});



function findUser(req:Request,res:Response): Users|undefined
{
    let user = userArray.find(u=>u.userId===req.params.userId);
    if( user !== undefined)
    {
        return user;
    }
}

function validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export { userRouter };
