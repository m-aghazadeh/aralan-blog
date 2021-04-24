const statistics= require('../../models/statistics');

exports.index = async (req,res) => {
    const data={
        totalUsers: await statistics.totalUsers(),
        totalPosts:await statistics.totalPosts(),
        totalViews:await statistics.totalViews(),
        totalComments: await  statistics.totalComments()
    }
    res.render('admin/dashboard/index', {layout: 'admin' , ...data});
}