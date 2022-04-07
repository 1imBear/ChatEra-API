const UserViewModel = (userName, password, id) => {
    var viewModel = {}
    if(id) viewModel.Id = id
    viewModel.UserName = userName;
    viewModel.Password = password;

    return viewModel;
}

export default UserViewModel
