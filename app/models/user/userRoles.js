const ROLES = {
    USER: 0,
    AUTHOR: 1,
    ADMIN: 2
}

const rolesAsText = {
    [ROLES.USER]: 'کاربر ساده',
    [ROLES.AUTHOR]: 'نویسنده',
    [ROLES.ADMIN]: 'مدیر',
}

module.exports = ROLES;

exports.rolesAsText = (role = null) => {
    return role !== null ? rolesAsText[role] : rolesAsText;
}