const db = require('../../../database/mysql');

module.exports.findAll = async () => {
    const [rows] = await db.query(`SELECT *
                                   FROM settings`);
    return rows;
}
module.exports.update = async updateFields => {
    Object.keys(updateFields).forEach(setting_name => {
        db.query(`UPDATE settings
                  SET setting_value=?
                  WHERE setting_name = ?`, [updateFields[setting_name], setting_name]);
    });
}