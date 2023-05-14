import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/HoverCard.module.css";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";

import React, { useState } from 'react';

import generatePDF from "@/utils/generatePDF";

function CategoryCard({ name, imageUrl, categoryId }) {
  return (
    <div className="col pb-4">
      <div className={`card ${styles.cardhover}`}>
        <div className="card-header">{name}</div>
        <Image
          src={imageUrl}
          className="card-img-top"
          alt="category pic"
          width={300}
          height={200}
        />
        <div className="card-body">
          <Link
            href={`/donations/${categoryId}/payment`}
            className="btn btn-primary"
          >
            Donate now
          </Link>
        </div>
      </div>
    </div>
  );
}


// const PDFButtonhandleClick = async () => {
//   const pdfBytes = await generatePDF();
//   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'myPDF.pdf';
//   a.click();
//   URL.revokeObjectURL(url);
// };


export default function CategoryPage({ categories }) {
  
  
  // // const [pdfData, setPdfData] = useState('');

  // // async function handleGeneratePDF (){
  // //   const data = generatePDF();
  // //   setPdfData(data);
  // // };

  // // async function handleDownloadPDF () {

  // //   await handleGeneratePDF();

  // //   const link = document.createElement('a');
  // //   link.href = pdfData;
  // //   link.download = 'my-pdf-document.pdf';
  // //   document.body.appendChild(link);
  // //   link.click();
  // //   document.body.removeChild(link);
  // // };

  // const generatePDF = () => {
  //   // Create a new jsPDF instance
  //   const doc = new jsPDF('p', 'pt');
  
  //   console.log("In generatePDF")
  
  //   // Create a HTML element with the React component
  //   const element = document.createElement('div');
  //   element.innerHTML = '<html><body>' + ReactDOMServer.renderToString(<Receipt />) + '</body></html>';
    
  //   document.body.appendChild(element);

  //   // Use html2canvas to convert the HTML element to a canvas
  //   html2canvas(element).then((canvas) => {
  //     // Convert the canvas to an image data URL
  //     const dataURL = canvas.toDataURL('image/png');
  
  //     // Add the image to the PDF document
  //     doc.addImage(dataURL, 'PNG', 10, 10, 180, 240);
  
  //     // Save the PDF document
  //     doc.save('my-pdf-document.pdf');
  //   });
  // };

  return (
    <>

    {/* <button onClick={generatePDF}>Download PDF</button> */}

    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          imageUrl={category.imageUrl}
          categoryId={category.id}
        />
      ))}
    </div>
    </>

  );
}

export async function getServerSideProps(context) {
  var categories;
  try {
    await dbConnect();
    categories = await Category.find();
    categories = categories.map((category) =>
      category.toObject({ getters: true })
    );
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
