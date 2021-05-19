const db = require('../../../database/mysql');

exports.find = async (postId) => {
    const [rows, fields] = await db.query(
        `SELECT p.*, u.full_name
         FROM posts p
                  JOIN users u ON p.author_id = u.id
         WHERE p.id = ? LIMIT 1
        `, [postId]);
    return rows.length > 0 ? rows[0] : false;
}

exports.findBySlug = async (postSlug) => {
    const [rows] = await db.query(`
                SELECT *
                FROM posts
                WHERE slug = ? LIMIT 1`,
        [postSlug])
    return rows[0];
}

exports.findAll = async (page = 1, perPage = 10) => {
    const offset = (page - 1) * perPage;
    const [rows, fields] = await db.query(
        `SELECT p.*, u.full_name
         FROM posts p
                  LEFT JOIN users u ON p.author_id = u.id
         ORDER BY p.created_at DESC LIMIT ?,?`, [offset, perPage]);
    return rows;
}

exports.create = async (postData) => {
    const [result] = await db.query(
        `INSERT INTO posts
         SET ?`, [postData]);
    return result.insertId;
}

exports.count = async () => {
    const [row] = await db.query(`SELECT COUNT(id) AS postsCount
                                  FROM posts LIMIT 1`);
    return row[0].postsCount;
}


exports.delete = async (postId) => {
    const [result] = await db.query(
        `DELETE
         FROM posts
         WHERE id = ? LIMIT 1`, [postId]);
    return result.affectedRows > 0;
}

exports.update = async (postId, updateFields) => {
    const [result] = await db.query(
        `UPDATE posts
         SET ?
         WHERE id = ? LIMIT 1`, [updateFields, postId]);
    return result.affectedRows > 0;
}