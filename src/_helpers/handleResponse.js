import { authenticationService } from '_services';

const SafeJsonParse = (text) => {
    try{
        return JSON.parse(text)
    }
    catch(e){
        return null;
    }
}

export const handleResponse = (response) =>
    response.text().then(text => {
        const data = text && SafeJsonParse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                authenticationService.logout();
                window.location.reload();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    })
    .catch( err => {
        if( !err.message.include('500')){
            authenticationService.logout();
            window.location.reload();
        }
        return Promise.reject(err);
    });