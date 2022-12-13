const Product = require('../models/Products');

module.exports.renderadd = async(req, res)=>{
    res.render('product-add');


}

module.exports.add = async(req, res) => {
    
    const product = new Product(req.body);
    product.images = req.files.map(f=> ({url: f.path, filename:f.filename}))

    const dt = new Date();
   product.timeStamp = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();  

    // console.log('this is the final product', product)
    await product.save();
    res.redirect('/product/list')
}

module.exports.renderList = async(req, res) => {
    const products = await Product.find({}); 
    res.render('product-list',{products});
}

module.exports.detail = async(req, res) => {
    const products = await Product.find({});
    res.render('product-detail', {products});
}

module.exports.delete = async(req, res)=>{
    const { id } = req.params;
   
  await Product.findByIdAndDelete(id);
  res.redirect('/product/list');

}