class User{
    userId: number;
    firstName: String;
    lastName: String;
    email: String;
    password: String;

    constructor(userId: number, firstName: String, lastName: String, email: String, password: String){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

export{User}