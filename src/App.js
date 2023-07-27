import React from "react";
import Calculator from "./Components/Calculator/Calculator.js";
import "./index.css";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen  flex-col items-center justify-center">
      <main className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Calculator de Servicii
        </h1>
        <Calculator />
      </main>
    </div>
  );
};

export default App;
