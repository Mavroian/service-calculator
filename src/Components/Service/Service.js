import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./service.css";

const Service = forwardRef(({ name }, ref) => {
  const [area, setArea] = useState(0);
  const [price, setPrice] = useState(0);

  // Calculate the total for the service
  const getTotal = () => {
    return {
      name: name,
      price: price,
      area: area,
      total: area * price,
    };
  };

  // Expose the getTotal function to parent component using ref
  useImperativeHandle(ref, () => ({
    getTotal,
  }));

  const handleAreaChange = (event) => {
    setArea(parseFloat(event.target.value));
  };

  const handlePriceChange = (event) => {
    setPrice(parseFloat(event.target.value));
  };

  return (
    <div className="service-container">
      <h3 className="service-name text-3xl font-extrabold  text-gray-900 mb-6 ">
        {name}
      </h3>
      <div className="input-container">
        <label className="input-label" htmlFor={`input-price-${name}`}>
          Price:
        </label>
        <input
          type="number"
          id={`input-price-${name}`}
          name={`price-${name}`}
          value={price}
          onChange={handlePriceChange}
          required
          className="input-field"
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor={`input-area-${name}`}>
          Area:
        </label>
        <input
          type="number"
          id={`input-area-${name}`}
          name={`area-${name}`}
          value={area}
          onChange={handleAreaChange}
          required
          className="input-field"
        />
      </div>
      <div className="total-container">
        <label className="total-label" htmlFor={`total-${name}`}>
          Total:
        </label>
        <span className="total-value">{getTotal().total.toFixed(2)} RON</span>
      </div>
    </div>
  );
});

export default Service;
