const productService = require('../services/productService');

exports.getProduct = async (req, res) => {
    const {SKU} = req.body;
    console.log(SKU);
    try {
        //console.log(sku);
        const product = await productService.getProductBySKU(SKU);
        console.log(product);
        res.status(201).json({message: 'Product Fetched', product});
    } catch (error) {
        res.status(401).json({ message: 'Failed to fetch the product', error: error.message });
    }
}

exports.getVariants = async (req, res) => {
    const {SKU} = req.body;
    console.log(SKU);
    try {
        const variants = await productService.getVariantsBySKU(SKU);
        console.log(variants);
        res.status(201).json({message: 'Variants Fetched', variants});
    } catch (error) {
        res.status(401).json({ message: 'Failed to fetch the variants', error: error.message });
    }
}

exports.getProduct2 = async (req, res) => {
    
}