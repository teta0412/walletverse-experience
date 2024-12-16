// src/utils/exportPdf.js
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const exportToPdf = async (element, fileName) => {
  if (!element) {
    throw new Error("Element not found");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    ignoreElements: (element) => {
      return element.classList.contains("sidenav");
    },
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210; // A4 width
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pageHeight = 297; // A4 height
  let position = 0;

  // Add first page
  pdf.addImage(
    canvas.toDataURL("image/png"),
    "PNG",
    0,
    position,
    imgWidth,
    imgHeight
  );

  // Add new pages if content exceeds first page
  while (position - imgHeight <= -pageHeight) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );
  }

  pdf.save(fileName);
  toast.success("Report exported successfully!");
};
