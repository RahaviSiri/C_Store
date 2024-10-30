const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.getProductBySKU = async (SKU) => {
    const sqlgetP = 'SELECT getProductBySKU(?) AS product;';
    const [rows] = await db.execute(sqlgetP,[SKU]);
    //console.log(rows[0]);
    const product = rows[0].product;
    return product;
}

exports.getVariantsBySKU = async (SKU) => {
    const sqlgetV = 'SELECT getVariantsBySKU(?) AS variants';
    const [rows] = await db.execute(sqlgetV,[SKU]);
    const variants =rows[0].variants;
    return variants;
}

exports.searchProducts = async (searchPrompt) => {
    console.log(searchPrompt);
    const sqlsearch = 'SELECT searchProducts(?) AS products';
    const [rows] = await db.execute(sqlsearch,[searchPrompt]);
    console.log(rows[0]);
    const products = rows[0].products;
    return products;
}