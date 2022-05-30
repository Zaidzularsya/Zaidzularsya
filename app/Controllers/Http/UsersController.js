"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Encryption_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Encryption"));
const battery_level_1 = __importDefault(require("battery-level"));
const is_charging_1 = __importDefault(require("is-charging"));
const axios_1 = __importDefault(require("axios"));
class UsersController {
    async index() {
        let users = Database_1.default
            .from('ZT_USERS')
            .leftJoin('ZT_PROFILS', 'ZT_USERS.USER_ID', '=', 'ZT_PROFILS.USER_ID')
            .select('*');
        console.log("Index of controller is runnign..");
        return users;
    }
    async create() {
        return "create";
    }
    async store({ request }) {
        let _data = request.all();
        let _input = JSON.parse(_data.data);
        _input.PASSWORD = Encryption_1.default.encrypt(_input.PASSWORD);
        let _verify_email = this.getVerifyUrl("Yulianto@neuronworks.co.id");
        let result = {
            status: 'success',
            input: _input,
            verify_email: _verify_email,
        };
        return result;
    }
    async show({ params }) {
        let username = params.id;
        let profil = await Database_1.default
            .from('ZT_USERS')
            .leftJoin('ZT_PROFILS', 'ZT_USERS.USER_ID', '=', 'ZT_PROFILS.USER_ID')
            .where('username', username);
        return profil[0];
    }
    async edit() {
        return "edit";
    }
    async update() {
        return "update";
    }
    async destroy() {
        return "destroy";
    }
    async login({ request, session }) {
        let param = request.only(['username', 'password']);
        let getPass = await this.getPassword(param.username);
        let checkPass = Boolean(getPass.find(e => Encryption_1.default.decrypt(e.password) === param.password));
        let result = [];
        if (checkPass) {
            let users = await Database_1.default
                .from('ZT_USERS')
                .leftJoin('ZT_PROFILS', 'ZT_USERS.USER_ID', '=', 'ZT_PROFILS.USER_ID')
                .where((query) => {
                query.where('username', param.username);
            });
            session.put('USER_ID', users[0].USER_ID);
            session.put('USERNAME', users[0].USERNAME);
            session.put('NAME', users[0].NAME);
            session.put('EMAIL', users[0].EMAIL);
            session.put('USER_STATUS_ID', users[0].USER_STATUS_ID);
            session.put('USER_LEVEL', users[0].USER_LEVEL);
            session.put('IS_VERIFY', users[0].IS_VERIFY);
            session.put('SESSION_ID', session.sessionId);
            users[0].SESSION_ID = session.sessionId;
            result.push({ guid: 1, code: 1, info: 'Login success', session: session.get('SESSION_ID'), session_id: session.sessionId, users: users[0] });
        }
        else {
            result.push({ guid: 1, code: 1, info: 'invalid username or password', session: session.get('SESSION_ID') });
        }
        return result;
    }
    async logout({ session }) {
        session.clear();
        session.initiate(false);
        let result = { guid: 0, code: 0, info: 'You are logout' };
        return result;
    }
    async verify({ request }) {
        if (request.hasValidSignature()) {
            return request.input('signature');
        }
        else {
            return 'url not valid';
        }
    }
    async isSessionExpired({ response, session }) {
        let Authenticated = Boolean(session.sessionId === session.get('SESSION_ID'));
        if (!Authenticated) {
            response.send({
                guid: 1,
                code: 1,
                info: 'Error authentication issue',
                message: 'Must be logged in',
                data: null,
                result: true
            });
        }
        else {
            response.send({
                guid: 0,
                code: 0,
                info: 'Session valid',
                message: 'Your session still valid',
                data: session.all(),
                result: false
            });
        }
    }
    async batteryStatus({ response }) {
        const level = await battery_level_1.default();
        let lagi_dicas = await is_charging_1.default().then(result => {
            return result;
        });
        if (lagi_dicas && level >= 0.94) {
            axios_1.default.get('https://api.telegram.org/bot1274045743:AAH7E0RuZ_55prc5C1aQmG9aqpyWJkftmPM/sendMessage', { params: {
                    chat_id: 156429203,
                    text: 'Bettery sudah penuh mohon untuk lepas charger'
                } }).then(function (_response) {
            }).catch(function (_error) {
            }).then(function () {
            });
        }
        let result = {
            guid: 1,
            code: 1,
            info: 'Check battery status and is charge or not',
            batter_level: level,
            is_charge: lagi_dicas
        };
        response.send(result);
    }
    getVerifyUrl(_email) {
        let url = Route_1.default.builder()
            .prefixUrl('http://localhost')
            .makeSigned('/users/verify', { expiresIn: '15m' });
        return url;
    }
    getPassword(_username) {
        let password = Database_1.default.from('ZT_USERS').select('password').where('username', _username);
        return password;
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map