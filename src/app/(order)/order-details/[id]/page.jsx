import React from "react";

const OrderDetails = ({ params, searchParams }) => {
  const { hello } = searchParams;
  const { id } = params;
  return (
    <div>
      {hello}
      {id}
    </div>
  );
};

export default OrderDetails;
