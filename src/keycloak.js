import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    realm: process.env.REACT_APP_REALM_NAME,
    url: process.env.REACT_APP_NETLIFY == 'true'
    ? '/keycloak'
    : process.env.REACT_APP_KEYCLOAK_URL,
    clientId: process.env.REACT_APP_CLIENT_ID
});

export default keycloak;