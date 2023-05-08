import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from 'react-dom/server';
import Receipt from '@/components/receipt';

const generatePDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Create a HTML element with the React component
  const element = document.createElement('div');
  element.innerHTML = '<html><body>' + ReactDOMServer.renderToString(<Receipt />) + '</body></html>';

  // Use html2canvas to convert the HTML element to a canvas
  html2canvas(element).then((canvas) => {
    // Convert the canvas to an image data URL
    const dataURL = canvas.toDataURL('image/png');

    // Add the image to the PDF document
    doc.addImage(dataURL, 'PNG', 10, 10, 180, 240);

    // Save the PDF document
    doc.save('my-pdf-document.pdf');
  });
};

export default generatePDF;
