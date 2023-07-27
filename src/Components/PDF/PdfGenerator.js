import React from "react";
import jsPDF from "jspdf";

const PdfGenerator = ({ services }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    const title = "Servicii de constructii";
    if (typeof title === "string" && title.trim() !== "") {
      // Add the title to the PDF and center it
      const textWidth =
        (doc.getStringUnitWidth(title) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.setFont("helvetica", "bold"); // Set font to bold
      doc.text(title, textOffset, 20);
      doc.setFont("helvetica", "normal"); // Reset font style to normal
    }

    // Starting position for the content
    let y = 30;

    // Loop through services and add their names and prices to the PDF
    services.forEach((service, index) => {
      let price;
      if (typeof service.price === "number") {
        price = service.price.toFixed(2);
      } else if (Array.isArray(service.price)) {
        price = service.price.map((p) => p.toFixed(2)).join(", ");
      } else {
        price = "N/A";
      }

      doc.setFont("helvetica", "bold"); // Set font to bold
      // Add the service name and price to the PDF and center it
      const serviceText = `Service ${index + 1}: ${
        service.name
      } - Price: ${price}`;
      const serviceWidth =
        (doc.getStringUnitWidth(serviceText) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const serviceOffset = (doc.internal.pageSize.width - serviceWidth) / 2;
      doc.text(serviceText, serviceOffset, y);
      doc.setFont("helvetica", "normal"); // Reset font style to normal
      y += 10;
    });

    // Add the current date to the PDF and center it
    const currentDate = new Date().toLocaleDateString();
    const dateWidth =
      (doc.getStringUnitWidth(currentDate) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const dateOffset = (doc.internal.pageSize.width - dateWidth) / 2;
    doc.text(currentDate, dateOffset, y + 10);

    doc.save("services.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
    >
      Generate PDF
    </button>
  );
};

export default PdfGenerator;
