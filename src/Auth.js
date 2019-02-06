import auth0 from 'auth0-js';

export default class Auth {

    auth0 = new auth0.WebAuth({
        domain: "gabtotal.eu.auth0.com",
        clientID: "XJY2WzUJ0M0yq9SI1xlv2gZSdWTxT4wB",
        redirectUri: "http://localhost:3000",
        audience: "https://cookta/api",
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication(callback) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult, callback);
            } else if (err) {
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    setSession(authResult, callback) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem("idToken", authResult.idToken);
        localStorage.setItem("accessToken", authResult.accessToken);

       this.auth0.client.userInfo(authResult.accessToken, function(err, profile) {
            if (profile) {
                localStorage.setItem("username", profile.nickname);
                callback(profile.nickname);
            }
        });
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem("idToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
    }

    isAuthenticated() {
        return localStorage.getItem("isLoggedIn") !== null;
    }
}