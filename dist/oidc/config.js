"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oidcConfig = {
    authRequired: true,
    issuerBaseURL: 'https://dev-yg.us.auth0.com/.well-known/openid-configuration',
    baseURL: 'http://localhost:3000/',
    clientID: 'H9F6QG5SzTKMv0tbmgxLj9LjG1EKVllA',
    secret: 'qwertyuiop',
    clientSecret: 'qwertyuiop',
    authorizationParams: {
        response_type: 'id_token',
        response_mode: 'form_post',
        scope: 'openid profile email',
    },
};
exports.default = oidcConfig;
