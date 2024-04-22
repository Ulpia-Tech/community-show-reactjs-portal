export const useSearch = () => {

    /**
     * @author Mihail Petrov
     * @param {*} reltioCollection 
     * @returns 
     */
    const $transformCustomerObject = (reltioCollection) => {
        
        const collection = [];
        reltioCollection.forEach((record) => {

            const attributes = record.attributes;

            collection.push({
                FirstName   : "FirstName"   in attributes ? attributes["FirstName"][0].value    : "",
                LastName    : "LastName"    in attributes ? attributes["LastName"][0].value     : "",
            });
        });

        return collection;
    }

    /**
     * @author Mihail Petrov
     * @returns 
     */
    const searchForCustomer = async () => {

        const body        = {
            "filter": "(equals(type,'configuration/entityTypes/Person'))",
            "select": "attributes.FirstName,attributes.LastName"
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

    return { searchForCustomer };
}