var UserViewModel = {
    Id : null,
    UserName : null,
    Password : null, 
}

let map = (id, userName, password) => {
    UserViewModel.Id = id
    UserViewModel.UserName = userName;
    UserViewModel.Password = password;

    return UserViewModel;
}

export default {
    UserViewModel, 
    map
};