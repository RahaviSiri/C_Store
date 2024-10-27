const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.getCartItems = async (id) => {
  const getcart = 'SELECT getCartItemsByID(?) AS cartItems';
  const [rows] = await db.execute(getcart, [id]);

  const cartItems = rows[0].cartItems;

  return cartItems;
};


exports.getCartID = async (id) => {
  const getcID = 'SELECT getCartID(?) AS cart_id';
  
  try {
      const [rows] = await db.execute(getcID, [id]); // 'rows' will contain the result set
      if (rows.length > 0) {
          console.log(rows[0].cart_id);
          return rows[0].cart_id; // Return the cart_id of the first row
      } else {
          return null; // Return null if no cart was found for the given customer_id
      }
  } catch (error) {
      throw new Error('Error fetching cart ID: ' + error.message);
  }
};

exports.getCartTotal = async (cart_id) => {
  const sqlTot = 'SELECT total_amount AS cart_total FROM cart WHERE cart_id = ?';
  //const [cart_total] = await db.execute(sqlTot, [cart_id]);
  
  try {
    const [rows] = await db.execute(sqlTot, [cart_id]); // 'rows' will contain the result set
    return rows[0].cart_total;
  } catch (error) {
      throw new Error('Error fetching cart total: ' + error.message);
  }

}


exports.checkIfUserExistsByID = async (id) => {
  
    // The function checks if the user exists by running a SELECT query on the registered_customer table with the provided email.
    const sql = 'SELECT * FROM registered_customer WHERE customer_id = ?';
    const [user] = await db.execute(sql, [id]);
  
    //console.log(user);
    
    if (user.length > 0) return true;
    else return false;
    
};

exports.getUserID = async (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userExists = await this.checkIfUserExistsByID(user.user_id);
    if (!userExists) {
      return { message: 'Invalid token, user not found!' };
    }

    return user.user_id; // Return user ID if valid
  } catch (err) {
    return { message: 'Invalid token' }; // Return error message if token is invalid
  }
};

exports.incrementItem = async (cart_id, varient_id) => {
  const sqlInc = 'CALL incrementCartItem(?,?)';
  db.execute(sqlInc, [cart_id,varient_id]);
}

exports.decrementItem = async (cart_id, varient_id) => {
  const sqlInc = 'CALL decrementCartItem(?,?)';
  db.execute(sqlInc, [cart_id,varient_id]);
}

exports.deleteItem = async (cart_id, varient_id) => {
  const sqlInc = 'CALL deleteCartItem(?,?)';
  db.execute(sqlInc, [cart_id,varient_id]);
}

exports.addToCart = async (user_id, varient_id, quantity) => {
  const sqlAddToCart = 'CALL addToCart(?,?,?)';
  db.execute(sqlAddToCart,[user_id, varient_id, quantity])
}

exports.getCartCount = async (id) => {
  const count = 'SELECT getCartItemCount(?) AS cartCount';
  const [rows] = await db.execute(count, [id]);
  return rows[0].cartCount; 
};
