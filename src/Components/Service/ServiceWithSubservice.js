import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./ServiceWithSubServices.css";

const ServiceWithSubServices = forwardRef(({ name, subServices }, ref) => {
  const [selectedSubServices, setSelectedSubServices] = useState([]);

  const handleSubServiceToggle = (subService) => {
    setSelectedSubServices((prevSelected) => {
      if (prevSelected.includes(subService)) {
        return prevSelected.filter((selected) => selected !== subService);
      } else {
        return [...prevSelected, subService];
      }
    });
  };

  const getTotal = () => {
    let total = 0;
    let prices = [];
    selectedSubServices.forEach((subService) => {
      const subServiceData = subServices.find(
        (service) => service.name === subService
      );
      if (subServiceData) {
        prices.push(subServiceData.price);
        total += subServiceData.price;
      }
    });

    return {
      name: "Service with Sub Services",
      total: total,
      price: 0,
      aria: 0,
    };
  };

  // Expose the getTotal function to the parent component using ref
  useImperativeHandle(ref, () => ({
    getTotal,
  }));

  return (
    <div className="service-with-sub-container service-container">
      <h3 className="service-with-sub-name text-3xl font-extrabold  text-gray-900 mb-6 ">
        {name}
      </h3>
      <div className="sub-service-container">
        {subServices.map((subService) => (
          <label key={subService.name} className="sub-service-label">
            <input
              type="checkbox"
              checked={selectedSubServices.includes(subService.name)}
              onChange={() => handleSubServiceToggle(subService.name)}
              className="sub-service-checkbox"
            />
            <span className="sub-service-name">{subService.name}</span> -{" "}
            <span className="sub-service-price">
              {subService.price.toFixed(2)}
            </span>
          </label>
        ))}
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

export default ServiceWithSubServices;
