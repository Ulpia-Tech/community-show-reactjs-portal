import { IF } from "../components/conditions/IF";
import { useSearch } from "../services/search.service";
import { useCustomerApi } from "../services/customer.service";

import "./DashboardPage.css"
import { useState } from "react";
import { EmailInput } from "../components/inputs/EmailInput";

import { useValidation } from '../hooks/useValidation '; 

import { ImCross  } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

export const DashboardPage = () => {

    const [searchBy, setSearchBy]                       = useState('customer');
    const [customerCollection, setCustomerCollection]   = useState();
    const [uiState, setUiState]                         = useState({
        isSearchboxVisible      : true,
        isNameValid             : true,
        isLastNameValid         : true,
        isEmailValid            : true,
        isPhoneValid            : true,
        isFormInUpdateState     : false,
        isFormInCreateState     : false
    });

    const [activeEntity, setActiveEntity]               = useState();
    const { createNewCustomer, searchForCustomer   }    = useCustomerApi();

    const { checkEmailValidity, checkPhoneValidity, checkNameValidity }    = useValidation();

    /**
     * @author Mihail Petrov
     */
    const handleSelectCustomer = (selectEntity) => {

        setActiveEntity(selectEntity);
        setUiState({...uiState, 
            isSearchboxVisible  : false ,
            isFormInCreateState : false ,
            isFormInUpdateState : true
        });
    };

    /**
     * @author Mihail Petrov
     */
    const handleBackToSearch = () => {

        setCustomerCollection(null);
        setActiveEntity(null);
        setUiState({...uiState, 
            isSearchboxVisible  : true  ,
            isFormInCreateState : false ,
            isFormInUpdateState : false
        });
    }

    /**
     * @author Mihail Petrov
     */
    const loadCreateNewRecord = () => {

        setActiveEntity({});
        setUiState({...uiState, 
            isSearchboxVisible  : false ,
            isFormInCreateState : true  ,
            isFormInUpdateState : false
        });
    };    

    /**
     * @author Mihail Petrov
     * @param {*} operationId 
     */
    const handleSearchOperation = (operationId) => {
        setSearchBy(operationId);
    };

    /**
     * @author Mihail Petrov
     */
    const handleSearch = async (value) => {

        const result = await searchForCustomer(value);

        setCustomerCollection(result.map((record) => {

            return <>
                <div key={record} className="flex mt8 mb8" onClick={ () => handleSelectCustomer(record) }>
                    <div className="mr8">{record.FirstName}</div>
                    <div>{record.LastName}</div>
                </div>
            </>
        }));
    };


    /**
     * @author Mihail Petrov
     */
    const processEntityCreate = async () => {

        const result = await createNewCustomer({
            FirstName   : activeEntity.FirstName,
            LastName    : activeEntity.LastName,
            Email       : activeEntity.Email
        });
    };


    /**
     * @author Mihail Petrov
     */
    const processEntityUpdate = async () => {

        const result = await createNewCustomer({
            FirstName   : activeEntity.FirstName,
            LastName    : activeEntity.LastName,
            Email       : activeEntity.Email,
            Phone       : activeEntity.Phone
        });
    };

    /**
     * @author Mihail Petrov
     * @param {*} e 
     */
    const handleChange = (e) => {

        const { name, value } = e.target;
        setActiveEntity(prevState => ({ ...prevState, [name]: value }));
    };

    /**
     * @author Mihail Petrov
     * @param {*} value 
     */
    const handleValidation = async (e) => {

        const { name, value } = e.target;

        if(name === 'FirstName') {
            const result = checkNameValidity(value);
            setUiState({...uiState, isNameValid: result.isValid})
        }

        if(name === 'LastName') {
            const result = checkNameValidity(value);
            setUiState({...uiState, isLastNameValid: result.isValid})
        }        

        if(name === 'Email') {

            const result =  await checkEmailValidity(value);
            setUiState({...uiState, isEmailValid: result.isValid})
        }

        if(name === 'Phone') {

            const result =  await checkPhoneValidity(value);
            console.log(result.isValid);
            setUiState({...uiState, isPhoneValid: result.isValid})
        }
    }

    /**
     * 
     * @param {*} inputId 
     * @returns 
     */
    const getInputClass = (inputId) => {

        if(inputId === null  ) return `input-text`;
        if(inputId === true  ) return `input-text--success`;
        if(inputId === false ) return `input-text--error`;
    }

    return <>
        <div className="wrapper">

            <div className="app-title">Select existing record</div>
            <div className="box mt16">

                <IF condition = {uiState.isSearchboxVisible}>
                    <div className="flex flex-space-between">
                        <div className={searchBy === 'customer' ? 'button-active': 'button'} onClick={ () => handleSearchOperation('customer') }>Search by Customer</div>
                        <div className={searchBy === 'patient'  ? 'button-active': 'button'} onClick={ () => handleSearchOperation('patient')  }>Search by Patient</div>
                    </div>

                    <input
                        className="input-text mt8"  
                        type="text" 
                        placeholder="Find your record fast"
                        onChange={(e) => handleSearch(e.target.value)}>
                    </input>

                    <div>
                        {customerCollection}
                    </div>  

                    <IF condition={customerCollection?.length === 0}>
                        <div className="mt16">
                            <div onClick={ loadCreateNewRecord } className="button--big--orange">
                                Add new customer
                            </div>
                        </div>
                    </IF>
                </IF>

                <IF condition={activeEntity}>

                    <div className="header-back" onClick={ handleBackToSearch }>
                        ⬅️ Go back to search
                    </div>

                    <div className="mt16">

                        <div className="flex">
                            <div className="mr32">
                                <label className="input-label mt16" htmlFor="username">First Name</label>
                                <input 
                                    className="input-text mt8" 
                                    id="username"
                                    name="FirstName"
                                    value={activeEntity?.FirstName}
                                    onChange={ handleChange }
                                    onBlur   = { handleValidation }
                                    type="text"/>

                                <IF condition={ !uiState.isNameValid }>
                                    <div className="error">Name is NOT valid</div>
                                </IF>

                            </div>
                            
                            <div>
                                <label className="input-label mt16" htmlFor="password">Last Name</label>
                                <input 
                                    className="input-text mt8" 
                                    id="password" 
                                    name="LastName"
                                    value = {activeEntity?.LastName} 
                                    onChange = { handleChange }
                                    onBlur   = { handleValidation }
                                    type="text"/>

                                <IF condition={ !uiState.isLastNameValid }>
                                    <div className="error">Name is NOT valid</div>
                                </IF>                                    
                            </div>
                        </div>
                    </div>

                    <div className="mt16" style={{position: 'relative'}}>
                        <label className="input-label mt16" htmlFor="email">Phone</label>
                        <input
                            className={getInputClass(uiState.isPhoneValid)}
                            id="email" 
                            name="Phone"
                            value={activeEntity?.Phone} 
                            onChange={ handleChange }
                            onBlur   = { handleValidation }
                            type="text"/>

                        <IF condition={ !uiState.isPhoneValid }>
                            <div className="input-icon--error">
                                <ImCross></ImCross>
                            </div>
                        </IF>

                        <IF condition={ uiState.isPhoneValid }>
                            <div className="input-icon--success">
                                <FaCheck></FaCheck>
                            </div>
                        </IF>

                        <IF condition={ !uiState.isPhoneValid }>
                            <div className="error">Phone is NOT valid</div>
                        </IF>

                    </div>                

                    {/* <EmailInput 
                        value={activeEntity?.Email}
                        onChange={ testMest }>
                    </EmailInput> */}
                    <div className="mt16" style={{position: 'relative'}}>
                        <label className="input-label mt16" htmlFor="email">E-mail</label>
                        <input 
                            className={getInputClass(uiState.isEmailValid)}
                            id="email" 
                            name="Email"
                            value={activeEntity?.Email} 
                            onChange = { handleChange }
                            onBlur   = { handleValidation }
                            type="text"/>

                        <IF condition={ !uiState.isEmailValid }>
                            <div className="input-icon--error">
                                <ImCross></ImCross>
                            </div>
                        </IF>

                        <IF condition={ uiState.isEmailValid }>
                            <div className="input-icon--success">
                                <FaCheck></FaCheck>
                            </div>
                        </IF>

                        <IF condition={ !uiState.isEmailValid }>
                            <div className="error">E-mail is NOT valid</div>
                        </IF>
                            
                    </div>                
                    
                    <div className="mt16">

                        <IF condition={ uiState.isFormInUpdateState === true }>
                            <div onClick={ processEntityUpdate } className="button--big">Update</div>
                        </IF>

                        <IF condition={ uiState.isFormInCreateState === true }>
                            <div onClick={ processEntityUpdate } className="button--big--orange">Create</div>
                        </IF>                        
                    </div>
                </IF>

            </div>
        </div>
    </>
};