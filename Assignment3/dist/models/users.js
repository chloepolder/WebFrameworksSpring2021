"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
class Users {
    constructor(userId, firstName, lastName, emailAddress, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
    toJSON() {
        let clone = new Users(this.userId, this.firstName, this.lastName, this.emailAddress, '');
        delete clone.password;
        return clone;
    }
}
exports.Users = Users;
//# sourceMappingURL=users.js.map