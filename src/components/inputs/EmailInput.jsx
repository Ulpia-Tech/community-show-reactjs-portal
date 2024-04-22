import React from 'react';
// import { useState, useEffect } from 'react';

import { useEmailValidation } from '../../hooks/useEmailValidation '; 
import { IF } from '../conditions/IF';
// import { useDebounce, useDebouncedCallback } from 'use-debounce';
import debounce from "lodash/debounce";

export const EmailInput = ({value, onChange}) => {

  const { email, isValid, errorMessage, isChecking, handleChange, checkEmailValidity } = useEmailValidation();


  const handleOnChange = async (e) => {

    console.log("DDDDDDD")

    const { name, value } = e.target;
    
    console.log(value);
    onChange(value);
    // const result = await checkEmailValidity(value);

    // console.log(result)
    // 
    
      
    // const debounceTimer = setTimeout(async () => {


    // });

    // return () => clearTimeout(debounceTimer);
  }

  // const a = debounce(handleOnChange, 3000);

  return (
    <div className="mt16">
      <label className="input-label mt16" htmlFor="email">E-mail</label>
      <input 
        className="input-text mt8" 
        id="email" 
        name="Email"
        value={value} 
        onBlur={ (e) => handleOnChange(e) }
        type="text"/>

      <IF condition={errorMessage && !isChecking}>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </IF>

      <IF condition={isValid && !isChecking}>
        <p style={{ color: 'green' }}>Valid email address</p>
      </IF>
    </div>        
  );
};