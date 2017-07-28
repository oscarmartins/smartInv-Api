"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginModel {
    adminLogin(knex, username, password) {
        return knex('admin')
            .select('id', 'fullname', 'warehouse_id')
            .where({
            username: username,
            password: password
        })
            .limit(1);
    }
    userLogin(knex, username, password) {
        return knex('users')
            .select('id', 'fullname', 'department_id')
            .where({
            username: username,
            password: password
        })
            .limit(1);
    }
}
exports.LoginModel = LoginModel;
//# sourceMappingURL=login.js.map