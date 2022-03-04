"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BackendsController {
    index({ view }) {
        return view.render('backend');
    }
    async create() {
        return { code: 0, guid: 0, info: "create method", message: "You access create method by get requests" };
    }
    async store() {
        return { code: 0, guid: 0, info: "store method", message: "You access store method by get requests" };
    }
    async show() {
        return { code: 0, guid: 0, info: "show method", message: "You access show method by get requests" };
    }
    async edit() {
        return { code: 0, guid: 0, info: "edit method", message: "You access edit method by get requests" };
    }
    async update() {
        return { code: 0, guid: 0, info: "update method", message: "You access update method by get requests" };
    }
    async destroy() {
        return { code: 0, guid: 0, info: "destroy method", message: "You access destroy method by get requests" };
    }
}
exports.default = BackendsController;
//# sourceMappingURL=BackendsController.js.map