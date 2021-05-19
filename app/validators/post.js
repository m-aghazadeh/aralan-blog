const messages = {
    title: 'فیلد عنوان نمیتواند خالی باشد.',
    slug: 'فیلد نامک نمیتواند خالی باشد.',
    content: 'فیلد محتوا نمیتواند خالی باشد.'
}
exports.create = (data) => {
    const errors = [];
    for (const item in data) {
        if (!data[item]) {
            errors.push(messages[item])
        }
    }
    return errors;
}


