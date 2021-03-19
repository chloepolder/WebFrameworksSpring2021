class Users{
    userId: String;
    firstName: String;
    lastName: String;
    emailAddress: String;
    password: String;

    constructor(userId: String, firstName: String, lastName: String, emailAddress: String, password: String){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
    toJSON(){
        let clone = <any> new Users(this.userId, this.firstName, this.lastName, this.emailAddress,'');
        delete clone.password;
        return clone;
    }
}



export{Users}