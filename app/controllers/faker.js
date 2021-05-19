const fakeService = require('../services/fakeService');
const userModel = require('../models/user');
const postModel = require('../models/post')
module.exports.user = async (req, res) => {
    for (let i = 0; i < parseInt(req.params.num); i++) {
        await userModel.create({
            full_name: fakeService.fake("{{name.firstName}} {{name.lastName}}"),
            description:fakeService.random.words(rand(32, 90)),
            email: fakeService.fake("{{internet.email}}"),
            password: '123',
            role: '2'
        });
    }
    res.send('done')
}
module.exports.comment = async (req, res) => {

}
module.exports.post = async (req, res) => {
    for (let i = 0; i < parseInt(req.params.num); i++) {
        await postModel.create({
            title: fakeService.random.words(rand(4, 10)),
            content: fakeService.random.words(rand(200, 400)),
            slug: 'blog-post-' + i,
            status: 2,
            author_id: rand(1, 30),
            views: rand(10, 100),
        })
    }
    res.send('done')
}

function rand(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}
