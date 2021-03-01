"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = require("./routes/userRoute");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
var methodOverride = require('method-override');
let app = express_1.default();
app.use(methodOverride('_method'));
app.use(body_parser_1.default.urlencoded({ extended: true })); //recieve bodyparser from html form
app.use(body_parser_1.default.json()); //recieve bodyparser from json request
app.use(express_1.default.static(path_1.default.join(process.cwd(), 'public')));
app.use('/User', userRoute_1.userRouter); //at 'localhost:3000/User' reads the userRoute.ts file
app.get('/', (req, res, next) => {
    res.sendFile(path_1.default.join(process.cwd() + '/public/html/index.html'));
});
app.listen(3000);
//# sourceMappingURL=index.js.map