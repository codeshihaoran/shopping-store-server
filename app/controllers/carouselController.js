const carouselmodel = require('../models/carouselmodel')
module.exports = {
    Carousel: async ctx => {
        try {
            let carousel = await carouselmodel.Carousel()
            ctx.body = {
                code: '001',
                carousel
            }
            console.log(carousel);
        } catch (err) {
            console.log('error:', err);
        }
    }
}