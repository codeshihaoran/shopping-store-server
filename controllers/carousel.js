const carouselmodel = require('../models/carousel')
module.exports = {
    Carousel: async ctx => {
        let carousel = await carouselmodel.Carousel()
        ctx.body = {
            code: '001',
            carousel
        }
        console.log(carousel);
    }
}