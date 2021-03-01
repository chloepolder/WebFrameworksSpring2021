"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
let userArray = [];
userArray.push(new user_1.User(1, 'Jon', 'Snow', 'jsnow@gmail.com', '12345'));
userArray.push(new user_1.User(2, 'Killua', 'Zoldyck', 'kzoldyk@gmail.com', 'abcde'));
userArray.push(new user_1.User(3, 'Paul', 'McCartney', 'pmccartney@gmail.com', '123abc'));
userRouter.get('/', (req, res, next) => {
    let tempArray = [];
    for (let i = 0; i < userArray.length; i++) {
        let user = new user_1.User(userArray[i].userId, userArray[i].firstName, userArray[i].lastName, userArray[i].email, 'hidden');
        tempArray.push(user);
    }
    res.status(200).send(tempArray); //200 OK success status
});
userRouter.post('/', (req, res, next) => {
    let lastId = userArray[userArray.length - 1].userId;
    userArray.push(new user_1.User(++lastId, req.body.firstName, req.body.lastName, req.body.email, req.body.password));
    res.status(201).send(userArray[userArray.length - 1]); //201 created success status
});
userRouter.patch('/:userId', (req, res, next) => {
    let user = null;
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].userId === +req.params.userId) {
            user = userArray[i];
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;
            break;
        }
    }
    if (user === null) {
        res.status(404).send({ message: `User with id ${req.params.userId} was not found.` });
    }
    else {
        res.status(200).send(user);
    }
});
userRouter.get('/:userId', (req, res, next) => {
    let user = null;
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].userId === +req.params.userId) {
            user = userArray[i];
            break;
        }
    }
    if (user === null) {
        res.status(404).send({ message: `User with id ${req.params.userId} was not found.` });
    }
    else {
        res.status(200).send(user);
    }
});
userRouter.delete('/:userId', (req, res, next) => {
    let user = null;
    for (let i = 0; i < userArray.length; i++) {
        if (userArray[i].userId === +req.params.userId) {
            user = userArray[i];
            userArray.splice(i, 1);
            break;
        }
    }
    if (user === null) {
        res.status(404).send({ message: `User with id ${req.params.userId} was not found.` });
    }
    else {
        res.status(200).send({ message: `User with id ${req.params.userId} has been deleted.` });
    }
});
//# sourceMappingURL=userRoute.js.map