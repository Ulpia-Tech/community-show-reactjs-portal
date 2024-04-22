export const useAuthApi = () => {

    /**
     * @author Mihail Petrov
     */
    const $persistAuthenticationData = (response) => {

        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);            
    };

    /**
     * @author Mihail Petrov
     * @param {*} param0 
     * @returns 
     */
    const login = async ({username, password}) => {

        let body = new URLSearchParams();
        body.set('username'   , username);
        body.set('password'   , password);
        body.set('grant_type' , 'password');

        const requestMeta = {

            method: 'POST',
            headers: {
                'Content-Type'  : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic cmVsdGlvX3VpOm1ha2l0YQ=='
            },
            body: body.toString()            
        };
    
        try {
            const response      = await fetch('oauth/token', requestMeta);
            const jsonResponse  = await response.json();

            if(response.status >= 400) {
                throw new Error(jsonResponse.error_description);
            }

            $persistAuthenticationData(jsonResponse);
            return { hasError: false, message: 'Succcess authentication'};
        }
        catch(error) {
            return { hasError: true, message: error.message};
        }
    };

    return { login };
}