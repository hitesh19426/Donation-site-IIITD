import React from 'react';
import Image from 'next/image';


function Receipt() {

  
  return (
    <div style={{ margin: "10px" }}>

      <div style={{ marginBottom: "100px" }}>

        <div>
          <Image src="https://iiitd.ac.in/sites/default/files/style3colorsmall.png" alt="IIITD Logo" style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
          }} />

          {/* <img src="https://iiitd.ac.in/sites/default/files/style3colorsmall.png" alt="IIITD Logo" style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
          }} /> */}
        </div>

        <div>
          <h1 style={{
            position: 'absolute', top: '25px', right: '37px',
            fontFamily: 'Sa',
            fontStyle: 'normal',

          }}>
            IIITD Donation Receipt  </h1>
        </div>

      </div>

      <hr style={{
        border: 'none',
        borderBottom: '3px solid #ccc',
        marginLeft: '12px',
        marginRight: '12px',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '38px' }}>
        <div style={{ flex: 1, marginRight: '16px' }}>
          <h3>From</h3>
          <p>Card content goes here.</p>
        </div>
        <div style={{ flex: 1, marginRight: '16px' }}>
          <h3>To</h3>
          <p>Card content goes here.</p>
        </div>
        <div style={{ flex: 1 }}>
          <h3> &nbsp; </h3>
          <p>Card content goes here.</p>
        </div>
      </div>







    </div>
  );
}

export default Receipt;
