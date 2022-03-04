"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Auth {
    async handle({ response, session }, next) {
        let Authenticated = Boolean(session.sessionId === session.get('SESSION_ID'));
        if (!Authenticated) {
            response.send({
                guid: 1,
                code: 1,
                info: 'Error authentication issue',
                message: 'Must be logged in'
            });
        }
        await next();
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map