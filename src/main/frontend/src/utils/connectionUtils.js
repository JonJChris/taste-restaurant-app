export const getRequestURL = () => {
    const reqPort = window.location.port ? ':8080' : '';
    const reqProtocol = window.location.protocol+ '//'
    return reqProtocol + window.location.hostname + reqPort
 
}