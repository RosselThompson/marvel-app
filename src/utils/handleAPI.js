const values = (error) =>{
    let obj = {type: '', message: error.data.message};
        switch (error.status) {
            case 401: obj.type = 'warning';  break;
            case 404: obj.type = 'error'; obj.message= error.data.status;  break;
            case 409: obj.type = 'error';  break;
            default: obj.type = 'error'; break;
        }

    return obj
}

export const HandleAPI = (renderAlert, error) => {
    const {type, message}= values(error);
    renderAlert(message,{variant: type});
}
