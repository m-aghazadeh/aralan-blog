const db = require('../../database/mysql');
exports.findAll = async (columns = []) => {

    const sqlColumns = columns > 0 ? columns.join(',') : '*';
    const [rows, fields] = await db.query(
        `SELECT ${sqlColumns}
         FROM users
        `);
    return rows;
}
