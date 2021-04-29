const messages = {
    full_name: 'نام کامل نمیتواند خالی باشد',
    email: 'ایمیل نمیتواند خالی باشد',
    password: 'رمز عبور نمیتواند خالی باشد',
    role: 'لطفا یک نقش کاربری انتخاب کنید',
}
exports.create = (data) => {
    const errors = [];
    for (const item in data ){
        if (!data[item]){
            errors.push(messages[item])
        }
    }
    console.log(errors)
    return errors;
}

