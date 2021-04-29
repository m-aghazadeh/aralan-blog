const db = require('@database/mysql');
const hashService = require('../../services/hashService');
exports.find = async (userId) => {
    const [rows, fields] = await db.query(`SELECT *
                                           FROM users
                                           WHERE id = ?`, [userId]);
    return rows.length > 0 ? rows[0] : false;
}

exports.findAll = async () => {
    const [rows, fields] = await db.query(
        `SELECT *
         FROM users
         ORDER BY created_at DESC
        `);
    return rows;
}

exports.findAll = async (columns = []) => {

    const sqlColumns = columns.length > 0 ? columns.join(',') : '*';
    const [rows, fields] = await db.query(
        `SELECT ${sqlColumns}
         FROM users
        `);
    return rows;
}

exports.create = async (userData) => {
    const hashedPassword = hashService.hashPassword(userData.password);
    const newUserData = {...userData, password: hashedPassword};
    const [result] = await db.query(
        `INSERT INTO users
         SET ?`, [newUserData]);
    return result.insertId;
}

exports.delete = async (userId) => {
    const [result] = await db.query(
        `DELETE
         FROM users
         WHERE id = ? LIMIT 1`, [userId]);
    return result.insertId;
}

exports.update = async (userId, updateFields) => {
    const hashedPassword = hashService.hashPassword(updateFields.password);
    const newUserData = {...updateFields, password: hashedPassword};
    const [result] = await db.query(
        `UPDATE users
         SET ?
         WHERE id = ? LIMIT 1`, [newUserData, userId]);
    return result.affectedRows > 0;
} 