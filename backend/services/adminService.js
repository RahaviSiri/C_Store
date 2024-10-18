const db = require('../config/db');

// Service for generating quarterly sales report
exports.quarterlySalesReport = async (year) => {

    // Query to fetch quarterly sales report data
    const sql = 'CALL getQuarterlySales(?);'; // Replace with actual query
    const [salesReport] = await db.execute(sql, year); // Example for first quarter, replace with dynamic value if needed

    return salesReport;
};

// Service for fetching top-selling products
exports.topSellingProducts = async (start_date, end_date) => {

    // Query to fetch top-selling products
    const sql = 'CALL getTopSellingProducts(?,?);'; // Replace with actual query
    const [topProducts] = await db.execute(sql, start_date, end_date);

    return topProducts;
};

// Service for fetching sales data by category
exports.salesByCategory = async () => {

    // Query to fetch sales by category
    const sql = 'SELECT * FROM sales_by_category'; // Replace with actual query
    const [salesByCategory] = await db.execute(sql);

    return salesByCategory;
};

// Service for fetching product interest trends
exports.productInterestTrends = async (SKU) => {

    // Query to fetch product interest trends (views, searches, etc.)
    const sql = 'CALL getSalesTrendByPeriod(?)'; // Replace with actual query
    const [trends] = await db.execute(sql,SKU);

    return trends;
};

exports.customerDetails = async (customer_id) => {

    // Query to fetch customer details
    const sql = 'CALL getCustomerDetails(?);'; // Modify query as needed
    const [customerDetails] = await db.execute(sql, customer_id);

    return customerDetails;
};

// Service for generating customer order report
exports.customerOrderReport = async (customer_id) => {

    // Query to fetch customer order report
    const sql = 'CALL customerOrderReport(?);'; // Replace with actual query
    const [orders] = await db.execute(sql, customer_id);

    return orders;
};

// Service for viewing customer messages
exports.viewCustomerMessages = async () => {

    // Query to fetch customer messages
    const sql = 'SELECT * FROM customer_messages'; // Replace with actual query
    const [messages] = await db.execute(sql);

    return messages;
};