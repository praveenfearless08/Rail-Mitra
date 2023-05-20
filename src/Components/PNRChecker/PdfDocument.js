import React from "react";
import { saveAs } from "file-saver";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

function PdfDocument({ pnrData }) {
  const generatePDF = async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage();
    const { height } = page.getSize();

    const font = await doc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 12;

    const drawText = (text, x, y) => {
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    };

    let yOffset = height - 50;

    drawText("PNR Details - ", 50, yOffset);
    yOffset -= 30;

    drawText(`PNR: ${pnrData.pnrNumber}`, 50, yOffset);
    yOffset -= 20;
    drawText(
      `Boarding Station: ${pnrData.boardingPoint} - Destination: ${pnrData.destinationStation}`,
      50,
      yOffset
    );
    yOffset -= 20;

    drawText(`Data Of Journey: ${pnrData.dateOfJourney}`, 50, yOffset);
    yOffset -= 20;

    drawText(
      `Journey Class: ${pnrData.journeyClass} | Quota: ${pnrData.quota} | Total Distance: ${pnrData.distance} km`,
      50,
      yOffset
    );
    yOffset -= 20;

    // table formatting
    const drawTable = (data, x, y) => {
      const tableWidth = 400;
      const tableHeight = 30;

      // Draw table headers
      const headers = [
        "S. No",
        "Current Status",
        "Booking Status",
        "Coach Position",
      ];
      let currentX = x;
      let currentY = y;
      headers.forEach((header) => {
        drawText(header, currentX, currentY);
        currentX += tableWidth / headers.length;
      });

      // Draw table rows
      currentX = x;
      currentY -= tableHeight;
      data.forEach((row, index) => {
        const rowData = [
          `${index + 1}`,
          row.currentStatus,
          row.bookingStatusDetails,
          row.currentStatusDetails,
        ];
        rowData.forEach((cell) => {
          drawText(cell, currentX, currentY);
          currentX += tableWidth / rowData.length;
        });
        currentX = x;
        currentY -= tableHeight;
      });
    };

    // Add more text and formatting as needed...
    const passengerTableData = pnrData.passengerList || [];
    const tableX = 50;
    const tableY = yOffset - 50;
    drawTable(passengerTableData, tableX, tableY);

    const pdfBytes = await doc.save();

    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(pdfBlob, "pnr_details.pdf");
  };
  return (
    <div>
      <button
        style={{
          width: 70,
          height: 30,
          backgroundColor: "#79e0ee",
          color: "black",
          fontSize: "16px",
          border: 0,
          borderRadius: 4,
          cursor: "pointer",
        }}
        onClick={generatePDF}
      >
        Print
      </button>
    </div>
  );
}

export default PdfDocument;
