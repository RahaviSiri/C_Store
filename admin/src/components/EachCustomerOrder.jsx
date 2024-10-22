import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';


const EachCustomerOrder = () => {

  return (
    <div>
      <h1>each Cutomer Order Details</h1>
     
      <Link to="/customer-order-reporte" >
          <p>Back.</p>
        </Link>
    </div>
  );
};

export default EachCustomerOrder;
