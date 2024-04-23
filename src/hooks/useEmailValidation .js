export const useEmailValidation = () => {

  /**
   * @author MIhail Petrov
   * @param {*} inputEmail 
   * @returns 
   */
  const checkEmailValidity = async (inputEmail) => {

    try {

      const response    = await fetch(`http://api.addressy.com/EmailValidation/Interactive/Validate/v2.00/json3.ws?Key=MC15-FF69-YY98-BH97&Email=${inputEmail}&Timeout=5000&AdditionalFields=True`);
      const data        = await response.json();

      const result      = data.Items[0];
      console.log(result);
      const isValid     = (result.ResponseCode === 'Valid');

      if(!isValid) {
        throw new Error(result.ResponseMessage);
      }

      return { isValid, message: '' }
    } catch (error) {
      return { isValid : false, message : 'Invalid E-mail adress' }
    }
  };

  /**
   * @author MIhail Petrov
   * @param {*} inputPhone 
   * @returns 
   */
  const checkPhoneValidity = async (inputPhone) => {

    try {

      const response    = await fetch(`https://api.addressy.com/PhoneNumberValidation/Interactive/Validate/v2.2/json3.ws?Key=MC15-FF69-YY98-BH97&Phone=${inputPhone}&Country=BG&Iso3Country=True&AdditionalFields=True`);
      const data        = await response.json();

      const result      = data.Items[0];
      
      const isValid     = (result.IsValid === 'Yes');

      if(!isValid) {
        throw new Error(result.ResponseMessage);
      }

      return { isValid, message: '' }
    } catch (error) {
      return { isValid : false, message : 'Invalid E-mail adress' }
    }
  };

  /**
   * @author Mihail Petrov
   * @param {*} input 
   */
  const checkNameValidity = (input) => {

    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const isValid     = regex.test(input);

    console.log(isValid)

    if(isValid) {
      return { isValid : true, message : '' }  
    }

    return { isValid : false, message : 'Invalid name' }
  };

  return { checkEmailValidity, checkPhoneValidity, checkNameValidity };
};



