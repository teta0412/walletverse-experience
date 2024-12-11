// src/utils/exportPdf.js
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPdf = async (element, fileName) => {
  if (!element) {
    throw new Error("Element not found");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    ignoreElements: (element) => {
      return element.classList.contains('sidenav');
    }
  });

  const pdf = new jsPDF('l', 'mm', 'a4');
  const pageWidth = 297; // A4 width in landscape
  const pageHeight = 210; // A4 height in landscape
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let position = 0;

  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);

  while (position - imgHeight <= -pageHeight) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
  }

  pdf.save(fileName);
};