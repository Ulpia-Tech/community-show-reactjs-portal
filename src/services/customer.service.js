export const useCustomerApi = () => {

    /**
     * @author Mihail Petrov
     * @param {*} collection 
     * @param {*} key 
     * @returns 
     */
    const $extractAttribute = (collection, key) => {

        if(collection && key in collection ) {
            return collection[key][0].value;
        }

        return "";
    }

    /**
     * @author Mihail Petrov
     * @param {*} reltioCollection 
     * @returns 
     */
    const $transformCustomerObject = (reltioCollection) => {
        
        const collection = [];
        reltioCollection.forEach((record) => {

            collection.push({
                uri         : record.uri,
                FirstName   : $extractAttribute(record.attributes, "FirstName"),
                LastName    : $extractAttribute(record.attributes, "LastName"),
                Email       : $extractAttribute(record.attributes, "Email"),
            });
        });

        return collection;
    }

    /**
     * @author Mihail Petrov
     * @returns 
     */
    const $buildRequestBody = (userObject) => {

        return [{
            "type": "configuration/entityTypes/Person",
            "attributes"    : {
                "FirstName" : [{"value" : (userObject.FirstName ) ? userObject.FirstName    : ""   }],
                "LastName"  : [{"value" : (userObject.LastName  ) ? userObject.LastName     : ""   }],
                "Phone"     : [{                    
                    "value": { "Number": [ { "value"   : (userObject.Phone     ) ? userObject.Phone: "" }]}
                }],
                "Email"     : [{
                    
                    "value": { "Email": [ { "value"   : (userObject.Email     ) ? userObject.Email        : "" }]
                    }
                }]
            }
        }];
    };

    /**
     * @author Mihail Petrov
     * @returns 
     */
    const searchForCustomer = async (query) => {

        const body        = {
            "filter": `(equals(type,'configuration/entityTypes/Person') and containsWordStartingWith(attributes.FirstName,'${query}')`,
            "select": "uri,attributes.FirstName,attributes.LastName"
        };

        const requestMeta = {

            method: 'POST',
            headers: {
                'Content-Type'  : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(body)
        };

        try {
            const response      = await fetch('api/R1TdiVqlfW0yLwf/entities/_search', requestMeta);
            const jsonResponse  = await response.json();

            return $transformCustomerObject(jsonResponse);
        }
        catch(error) {
            console.log(error)
        }
    };

    /**
     * @author Mihail Petrov
     * @param {*} userObject 
     * @returns 
     */
    const createNewCustomer = async (userObject) => { 

        const requestMeta = {

            method: 'POST',
            headers: {
                'Content-Type'  : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify($buildRequestBody(userObject))
        };

        try {
            const response      = await fetch('api/R1TdiVqlfW0yLwf/entities', requestMeta);
            const jsonResponse  = await response.json();

            return $transformCustomerObject(jsonResponse);
        }
        catch(error) {
            console.log(error)
        }
    }

    /**
     * @author Mihail Petrov
     * @param {*} entityId 
     * @returns void
     */
    const updateCustomer = async (entityId, userObject) => {

        const requestMeta = {

            method: 'POST',
            headers: {
                'Content-Type'  : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify($buildRequestBody(userObject))
        };

        try {
            const response      = await fetch('api/R1TdiVqlfW0yLwf/entities', requestMeta);
            const jsonResponse  = await response.json();

            return $transformCustomerObject(jsonResponse);
        }
        catch(error) {
            console.log(error)
        }
    };

    return { searchForCustomer, createNewCustomer, updateCustomer};
};