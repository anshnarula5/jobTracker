export const oktaConfig = {
    clientId : '0oacsxnloamVC1kwV5d7',
    issuer : 'https://dev-50819556.okta.com/oauth2/default',
    redirectUri : 'https://localhost:3000/login/callback',
    scopes : ['openid', 'profile', 'email'],
    pcke: true,
    disableHttpsCheck: true
}