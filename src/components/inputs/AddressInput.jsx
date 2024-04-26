// import React from 'react';
// import { useState, useEffect } from 'react';

// import { useEmailValidation } from './useValidation '; 
// import { IF } from './IF';

// export const AddressInput = () => {
//   // const { email, isValid, errorMessage, isChecking, handleChange } = useEmailValidation();
//   // return (
//   //   <div>
//   //     <label htmlFor="email">Email:</label>
//   //     <input
//   //       type="email"
//   //       id="email"
//   //       onBlur={handleChange}
//   //       placeholder="Enter your email"
//   //     />
      
//   //     <IF condition={isChecking}>
//   //       <p>Checking email validity...</p>
//   //     </IF>

//   //     <IF condition={errorMessage && !isChecking}>
//   //       <p style={{ color: 'red' }}>{errorMessage}</p>
//   //     </IF>

//   //     <IF condition={isValid && !isChecking}>
//   //       <p style={{ color: 'green' }}>Valid email address</p>
//   //     </IF>
//   //   </div>
//   // );

//   return (
//     <div style={{width: "250px", margin: "auto"}}>
//       <input type="text" placeholder='Country'/>
//       <br></br>
//       <input type="text" placeholder='City'/>
//       <br></br>
//       <input type="text" placeholder='Street'/>
//       <br></br>
//       <input type="text" placeholder='Postal Code'/>
//     </div>
//   );
// };