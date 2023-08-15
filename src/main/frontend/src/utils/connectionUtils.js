export const getRequestURL = () => {
    const reqPort = window.location.port ? ':8080' : '';
    return 'http://'+window.location.hostname + reqPort
 
}