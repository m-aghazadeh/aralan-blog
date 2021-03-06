const db = require('../../../database/mysql');
const commentStatuses = require('./commentStatus');

exports.findAll = async () => {
    const [rows] = await db.query(
        `SELECT c.*, p.title
         FROM comments c
                  JOIN posts p ON c.post_id = p.id
         ORDER BY c.created_at DESC
        `);
    return rows;
}

exports.findByPostId = async (postId, status = commentStatuses.APPROVED) => {
    const [rows] = await db.query(
        `SELECT *
         FROM comments
         WHERE post_id = ?
           AND status = ?`, [postId, status]);
    return rows;
}

exports.create = async (commentData) => {
    const [result] = await db.query(`INSERT INTO comments
                                     SET ?`, [commentData])
    return result.insertId;
}


exports.delete = async (commentId) => {
    const [result] = await db.query(
        `DELETE
         FROM comments
         WHERE id = ? LIMIT 1`, [commentId]);
    return result.affectedRows > 0;
}

exports.reject = async (commentId) => {
    const [result] = await db.query(
        `UPDATE comments
         SET status=?
         WHERE id = ? LIMIT 1`, [commentStatuses.REJECTED, commentId]);
    return result.affectedRows > 0;
}

exports.approve = async (commentId) => {
    const [result] = await db.query(
        `UPDATE comments
         SET status=?
         WHERE id = ? LIMIT 1`, [commentStatuses.APPROVED, commentId]);
    return result.affectedRows > 0;
}