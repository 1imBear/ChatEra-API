class UserViewModel{
    Id = null;
    UserName = null;
    Password = null;

    map (id, userName, password){
        this.Id = id
        this.UserName = userName;
        this.Password = password;
    }

    constructor(){}
    
}

export default UserViewModel;