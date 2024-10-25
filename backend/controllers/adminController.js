const adminServices = require('../services/adminService');

// Controller for quarterly sales report
exports.quarterlySalesReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const result = await adminServices.getQuarterlySalesReport(startDate, endDate);
        res.status(200).json({
            message: 'Quarterly Sales Report Generated',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error generating Quarterly Sales Report',
            error: error.message
        });
    }
};

// Controller for top-selling products
exports.topSellingProducts = async (req, res) => {
    try {
        const { limit } = req.body; // Optional limit for top products
        const result = await adminServices.getTopSellingProducts(limit);
        res.status(200).json({
            message: 'Top Selling Products Report Generated',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error generating Top Selling Products report',
            error: error.message
        });
    }
};

// Controller for sales by category
exports.salesByCategory = async (req, res) => {
    try {
        const result = await adminServices.getSalesByCategory();
        res.status(200).json({
            message: 'Sales by Category Report Generated',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error generating Sales by Category report',
            error: error.message
        });
    }
};

// Controller for product interest trends
exports.productInterestTrends = async (req, res) => {
    try {
        const result = await adminServices.getProductInterestTrends();
        res.status(200).json({
            message: 'Product Interest Trends Report Generated',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error generating Product Interest Trends report',
            error: error.message
        });
    }
};

// Controller function to handle fetching customer details
exports.customerDetails = async (req, res) => {
  try {
    // Call the service function to get customer details
    const {customer_id} = req.body;
    const customerDetails = await adminServices.customerDetails(customer_id);

    // Send the customer details as a response
    res.status(200).json(customerDetails);
  } catch (error) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: error.message || 'An error occurred while fetching customer details' });
  }
};


// Controller for customer order report
exports.customerOrderReport = async (req, res) => {
    try {
        const {customer_id} = req.body;
        const result = await adminServices.getCustomerOrderReport(customer_id);
        res.status(200).json({
            message: 'Customer Order Report Generated',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error generating Customer Order Report',
            error: error.message
        });
    }
};

// Controller for viewing customer messages
exports.viewCustomerMessages = async (req, res) => {
    try {
        const result = await adminServices.getCustomerMessages();
        res.status(200).json({
            message: 'Customer Messages Retrieved',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving customer messages',
            error: error.message
        });
    }
};
