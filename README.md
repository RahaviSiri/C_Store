# 🛒 Single Vendor E-Commerce Platform  

A **single-vendor e-commerce platform** designed for **C**, a local chain retailer in Texas, as part of a **3rd Semester Database Project**.  
This system was implemented using **React.js (frontend)**, **Node.js & Express (backend)**, and **MySQL (database)**.  

The project models a real-world online retail solution with **product management, variants, inventory control, checkout process, delivery estimation, and analytics reporting**.  

---

## 🚀 Features  

### 🔹 Product & Inventory Management  
- Products with **variants** (e.g., iPhone X → 16GB/32GB, Red/Black).  
- Each product has **SKU**, title, weight, custom attributes.  
- Products belong to **categories & subcategories**.  
- **Inventory management** for stock tracking at the warehouse level.  

### 🔹 Customer & Orders  
- Customers can **register** or browse as guests.  
- Products can be added to **cart** without purchase.  
- **Checkout process** includes:  
  - Customer details  
  - Delivery method (**pickup/delivery**)  
  - Payment method (**cash on delivery / card**)  
- Orders update inventory automatically.  

### 🔹 Delivery Module  
Delivery estimation rules:  
- ✅ Product in stock, delivery to main city → **5 days**  
- ✅ Product in stock, non-main city → **7 days**  
- ❌ Out of stock → add **+3 days** to above cases  

### 🔹 Reports & Analytics  
- 📊 Quarterly sales report (by year)  
- 📊 Top-selling products (by period)  
- 📊 Most-ordered categories  
- 📊 Product interest analysis (time period with most views/orders)  
- 📊 Customer-order reports  

---

## 🏗️ Database Design  

The database was designed to **encapsulate all requirements** with strong focus on **ACID properties**:  

### 🔑 Entities  
- `Product` (with custom attributes)  
- `Variant` (price, color, size, etc.)  
- `Category` (with subcategories)  
- `Customer`  
- `Cart`  
- `Order` & `OrderItem`  
- `Inventory`  
- `Delivery`  

### ⚙️ Constraints & Integrity  
- **Primary keys & foreign keys** for relational integrity.  
- **Stored procedures** for sales reports.  
- **Triggers** to update inventory on checkout.  
- **Transactions** for purchase consistency.  
- **Indexes** on SKU, Category, and Order queries for performance.  

---

## 🛠️ Tech Stack  

- **Frontend:** [React.js](https://react.dev/)  
- **Backend:** [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)  
- **Database:** [MySQL](https://www.mysql.com/)  
- **ORM/Query Tool:** MySQL queries with Node.js  
- **Authentication:** Basic (session/user management)  

---

## 📦 Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform
