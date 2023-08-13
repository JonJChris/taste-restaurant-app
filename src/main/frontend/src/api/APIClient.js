import axios from 'axios'

const useAPIClient = (httpUrl, httpMethod, requestBody, callBackFunc) => {
    const allowedMethods = ['get', 'post'];
    if (!allowedMethods.includes(httpMethod)) {
        throw new Error({ message: 'Not a valid HTTP method', timestamp: new Date().toUTCString });
    }

    const client = async () => {
        try {
            const resp = axios.request({
                method: httpMethod,
                url: httpUrl,
                body: requestBody
            });
            const data = await resp.data;
            callBackFunc(data);
        } catch (Error) {
            throw new Error({
                message: 'Response Failure',
                exception: Error,
                timeStamp: new Date().toUTCString
            });
        }

    }

}

export default useAPIClient;
