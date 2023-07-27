import React, { useState, useRef } from "react";
import Service from "../Service/Service";
import ServiceWithSubServices from "../Service/ServiceWithSubservice";
import "./CalculatorForm.css";
import PdfGenerator from "../PDF/PdfGenerator";

const CalculatorForm = () => {
  const serviceRefs = useRef({}); // Ref to store references to Service components
  const [services, setServices] = useState([]); // Array of services [{name: "service-1", total: 0}, ...
  const [total, setTotal] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let servicesList = [];
    let sum = 0;

    for (const serviceName in serviceRefs.current) {
      let serviceInfo = serviceRefs.current[serviceName].getTotal();

      servicesList.push(serviceInfo); // Store the service in the services array
      setServices(servicesList); // Update the services state (to trigger re-render
      const serviceRef = serviceRefs.current[serviceName];
      const totalValue = serviceRef.getTotal().total; // Access the getTotal function
      sum += totalValue;
    }

    setTotal(sum);
  };

  return (
    <form className="calculator-form" onSubmit={handleSubmit}>
      {/* Store Service components using refs */}
      <Service
        name="service-1"
        ref={(ref) => (serviceRefs.current["service-1"] = ref)}
      />
      <Service
        name="service-2"
        ref={(ref) => (serviceRefs.current["service-2"] = ref)}
      />
      <Service
        name="service-3"
        ref={(ref) => (serviceRefs.current["service-3"] = ref)}
      />
      <ServiceWithSubServices
        name="service-with-sub-services"
        ref={(ref) => (serviceRefs.current["service-4"] = ref)}
        subServices={[
          { name: "Sub-Service A", price: 50 },
          { name: "Sub-Service B", price: 75 },
          { name: "Sub-Service C", price: 100 },
        ]}
      />
      {total && <div className="total-display">{total}</div>}
      <button type="submit" className="calculate-btn">
        Calculate
      </button>
      <br />
      <PdfGenerator services={services} onClick={handleSubmit} />
    </form>
  );
};

export default CalculatorForm;
