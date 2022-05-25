const map = (model, data) => {
    try {
        for (var key in model) {
            model[key] = null;
            for(var _key in data) {
                if (key == _key) {
                    model[key] = data[_key];
                }
            }
        }
    } catch (error) {
        throw new Error(error);
    }
    return model;
}

export default map