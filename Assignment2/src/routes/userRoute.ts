import express from 'express';
import {User} from '../models/user';

const userRouter = express.Router();

let userArray:User[] = [];
userArray.push(new User(1, 'Jon', 'Snow', 'jsnow@gmail.com', '12345'));
userArray.push(new User(2, 'Killua', 'Zoldyck', 'kzoldyk@gmail.com', 'abcde'));
userArray.push(new User(3, 'Paul', 'McCartney', 'pmccartney@gmail.com', '123abc'));


userRouter.get('/',(req, res, next)=>{ //get request for 'localhost(3000)/User/
    let tempArray:User[] = [];
    for(let i=0;i<userArray.length;i++){
        let user = new User(userArray[i].userId , userArray[i].firstName, userArray[i].lastName, userArray[i].email, 'hidden');
        tempArray.push(user);
    }
    res.status(200).send(tempArray); //200 OK success status
});

userRouter.post('/',(req, res, next)=>{ //post request for 'localhost(3000)/User/
    let lastId = userArray[userArray.length-1].userId;
    userArray.push(new User(++lastId, req.body.firstName, req.body.lastName, req.body.email, req.body.password));
    res.status(201).send(userArray[userArray.length-1]); //201 created success status
});

userRouter.patch('/:userId',(req, res, next)=>{ //patch request for 'localhost(3000)/User/{id}
    let user:User|null = null;

    for(let i = 0; i<userArray.length; i++){
        if(userArray[i].userId === +req.params.userId){
            user = userArray[i]; 
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;
            break;
        }
    }
    if(user===null){
        res.status(404).send({message:`User with id ${req.params.userId} was not found.`});        
    }
    else{
        res.status(200).send(user); 
   }
});
userRouter.get('/:userId',(req, res, next)=>{ //get request for 'localhost(3000)/User/{id}
let user:User|null = null;
for(let i = 0; i<userArray.length; i++){
    if(userArray[i].userId === +req.params.userId){
        user = userArray[i];
        break;
    }
}
if(user===null){
    res.status(404).send({message:`User with id ${req.params.userId} was not found.`});        
}
else{
    res.status(200).send(user); 
}
});
userRouter.delete('/:userId',(req, res, next)=>{ //delete request for 'localhost(3000)/User/{id}
let user:User|null = null;

for(let i = 0; i<userArray.length; i++){
    if(userArray[i].userId === +req.params.userId){
        user = userArray[i];
        userArray.splice(i,1);
        break;
    }
}
if(user===null){
    res.status(404).send({message:`User with id ${req.params.userId} was not found.`});        
}
else{
    res.status(200).send({message:`User with id ${req.params.userId} has been deleted.`}); 
}
});
export{userRouter}