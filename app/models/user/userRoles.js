const userRoles = {
    USER: 0,
    AUTHOR: 1,
    ADMIN: 2
}

const rolesAsText = {
    [userRoles.USER]: 'کاربر ساده',
    [userRoles.AUTHOR]: 'نویسنده',
    [userRoles.ADMIN]: 'مدیر',
}

exports.roles = () => {
    return userRoles;
}

exports.rolesAsText = (role = null) => {
    return role!==null ? rolesAsText[role] : rolesAsText;
}