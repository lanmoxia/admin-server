const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-relation')


const CategorySchema = new mongoose.Schema({
    name : {type : String}
},{
    toJSON : {virtuals : true}//当调用json字段时使用 
})

// virtual添加虚拟
CategorySchema.virtual('posts',{
    //来源
    ref : 'Post',
    //本模型中字段
    localField : '_id',
    //关联模型字段
    foreignField : 'categories',
    justOne : false,
})

const Category = mongoose.model('Category',CategorySchema)

//模型参数有俩 第一个参数为模型名称 第二个为模型结构
const Post = mongoose.model('Post', new mongoose.Schema({
    title : { type : String },
    body : { type : String },
    categories : [{ type : mongoose.SchemaTypes.ObjectId,ref : 'Category' }],
}))

async function main(){

    const cats = await Category.find().populate('posts').lean()//lean() 表示输出存粹的JSON数据

    //console.log(cats[0].posts);//因为之前定义过 虚拟 posts 所以可以反向查看
    console.log(cats)
}
main()