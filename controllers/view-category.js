
const viewCateModel = require('../models/view-category')
module.exports = {
    getViewCategory: async ctx => {
        let viewCateInfo = await viewCateModel.getViewCate()
        ctx.body = {
            code: '001',
            viewCateInfo
        }
    }
}