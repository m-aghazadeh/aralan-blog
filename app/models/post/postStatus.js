const postStatuses = {
    DRAFT: 0,
    REVIEW: 1,
    PUBLISHED: 2
}

const statusesAsText = {
    [postStatuses.DRAFT]: 'پیش نویس',
    [postStatuses.REVIEW]: 'در حال بررسی',
    [postStatuses.PUBLISHED]: 'منتشر شده',
}

exports.statuses = () => {
    return postStatuses;
}

exports.statusesAsText = (status = null) => {
    return status!==null ? statusesAsText[status] : statusesAsText;
}