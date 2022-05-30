"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
Route_1.default.get('/', async () => {
    let aplication_version = Application_1.default.version.toString();
    let adonis_version = Application_1.default.adonisVersion.toString();
    let node_environment = Application_1.default.nodeEnvironment;
    return { hello: 'world',
        aplication_version: aplication_version,
        adonis_version: adonis_version,
        node_environment: node_environment,
        app_key: Application_1.default.env.get('APP_KEY'),
        aplication_running: Application_1.default.isReady
    };
});
Route_1.default.group(() => {
    Route_1.default.resource('users', 'UsersController');
}).prefix('api').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.resource('user', 'UsersController');
}).prefix('dashboard').middleware('auth');
Route_1.default.group(() => {
    Route_1.default.resource('backend', 'BackendsController');
    Route_1.default.on('profil').redirect('/backend');
}).middleware('auth');
Route_1.default.group(() => {
    Route_1.default.post('auth', 'UsersController.login');
    Route_1.default.get('logout', 'UsersController.logout');
    Route_1.default.get('verify', 'UsersController.verify');
    Route_1.default.get('isSessionExpired', 'UsersController.isSessionExpired');
}).prefix('users');
Route_1.default.get('login', async ({ view }) => {
    return view.render('login');
});
Route_1.default.get('/battery-status', 'UsersController.batteryStatus');
//# sourceMappingURL=routes.js.map