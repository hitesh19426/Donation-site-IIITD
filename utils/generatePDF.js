import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from 'react-dom/server';
import Receipt from '@/components/Receipt';


const generatePDF = () => {
  // Create a new jsPDF instance
  const doc = new jsPDF();

  // console.log("In generatePDF")

  // Create a HTML element with the React component
  const element = document.createElement('temp');
  element.innerHTML = '<html><body>' + ReactDOMServer.renderToString(<Receipt />) + '</body></html>';

  document.body.appendChild(element);

  // Convert the HTML element to a pdf page using html2pdf's core function

  // // Use html2canvas to convert the HTML element to a canvas
  html2canvas(element).then((canvas) => {
    // Convert the canvas to an image data URL
    const dataURL = canvas.toDataURL('image/png');

    // Add the image to the PDF document
    doc.addImage(dataURL, 'PNG', 0, 0);

    // Save the PDF document
    doc.save('my-pdf-document.pdf');
  });


};

export default generatePDF;
