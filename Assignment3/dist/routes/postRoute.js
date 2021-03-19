"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const posts_1 = require("../models/posts");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
postRouter.get("/", (req, res, next) => {
    //get request for 'localhost(3000)/Posts/
    //sorted most recent to least recent 
    res.status(200).send(posts_1.postArray.sort((a, b) => {
        return a.createdDate > b.createdDate ? -1 : a.createdDate < b.createdDate ? 1 : 0;
    }));
});
postRouter.get("/:postId", (req, res, next) => {
    let post = findPost(req, res);
    if (post)
        res.status(200).send(post);
    else
        res.status(404).send({ message: `Post with id ${req.params.postId} was not found.` });
});
postRouter.post("/", (req, res, next) => {
    //post request for 'localhost(3000)/Posts/
    if (req.body.title && req.body.content && req.body.userId && req.body.headerImage) { //if user submitted required fields
        if (req.headers.token) { //truthy (if the token exists .. do this:)
            try {
                let tokenPayload = jsonwebtoken_1.default.verify(req.headers.token.toString(), 'vnjdbbviwd');
                console.log(tokenPayload);
                if (tokenPayload.userId === req.body.userId) {
                    //BODY OF REQUEST HERE
                    let today = new Date();
                    let id = 0;
                    if (posts_1.postArray.length !== 0) {
                        id = (posts_1.postArray[posts_1.postArray.length - 1].postId);
                    }
                    posts_1.postArray.push(new posts_1.Posts(++id, today.toISOString().slice(0, 10), req.body.title, req.body.content, req.body.userId, req.body.headerImage, today.toISOString().slice(0, 10)));
                    res.status(201).send(posts_1.postArray[posts_1.postArray.length - 1]); //201 created success status
                }
                else {
                    res.status(401).send({ message: `You can only make a post to this on account if you are logged in as the approprate user.` });
                }
            }
            catch (ex) { //invalid token
                console.log(ex);
                res.status(401).send({ message: 'Invalid token.' });
            }
        }
        else {
            res.status(401).send({ message: 'Missing authorization header.' });
        }
    }
    else {
        res.status(406).send({ message: 'Please enter data in the required fields.' });
    }
});
postRouter.patch("/:postId", (req, res, next) => {
    //patch request for 'localhost(3000)/Posts/
    if (req.body.content && req.body.userId && req.body.headerImage) { //if user submitted required fields
        if (req.headers.token) { //truthy (if the token exists .. do this:)
            try {
                let tokenPayload = jsonwebtoken_1.default.verify(req.headers.token.toString(), 'vnjdbbviwd');
                console.log(tokenPayload);
                if (tokenPayload.userId === req.body.userId) {
                    //BODY OF REQUEST HERE
                    let today = new Date();
                    let foundPost = findPost(req, res);
                    if (foundPost !== undefined) {
                        foundPost.content = req.body.content;
                        foundPost.headerImage = req.body.headerImage;
                        foundPost.lastUpdated = today.toISOString().slice(0, 10);
                    }
                    res.status(200).send(foundPost);
                }
                else {
                    res.status(401).send({ message: `You can only update this post if you are logged in as the appropriate user.` });
                }
            }
            catch (ex) { //invalid token
                console.log(ex);
                res.status(401).send({ message: 'Invalid token.' });
            }
        }
        else {
            res.status(401).send({ message: 'Missing authorization header.' });
        }
    }
    else {
        res.status(406).send({ message: 'Please enter data in the required fields.' });
    }
});
postRouter.delete("/:postId", (req, res, next) => {
    //post request for 'localhost(3000)/Posts/
    if (req.body.userId) { //if user submitted required fields
        if (req.headers.token) { //truthy (if the token exists .. do this:)
            try {
                let tokenPayload = jsonwebtoken_1.default.verify(req.headers.token.toString(), 'vnjdbbviwd');
                console.log(tokenPayload);
                if (tokenPayload.userId === req.body.userId) {
                    //BODY OF REQUEST HERE
                    let post = findPost(req, res);
                    if (post) {
                        posts_1.postArray.splice(posts_1.postArray.findIndex(u => u.postId === post?.postId), 1);
                        res.status(200).send({ message: `Post with id ${req.params.postId} has been deleted.` });
                    }
                    else {
                        res.status(404).send({ message: `Post with id ${req.params.post} was not found.` });
                    }
                }
                else {
                    res.status(401).send({ message: `You can only delete this post if you are logged in as the appropriate user.` });
                }
            }
            catch (ex) { //invalid token
                console.log(ex);
                res.status(401).send({ message: 'Invalid token.' });
            }
        }
        else {
            res.status(401).send({ message: 'Missing authorization header.' });
        }
    }
    else {
        res.status(406).send({ message: 'Please enter your userId to delete the post.' });
    }
});
function findPost(req, res) {
    let post = posts_1.postArray.find(u => u.postId === +req.params.postId);
    if (post !== undefined) {
        return post;
    }
}
//# sourceMappingURL=postRoute.js.map