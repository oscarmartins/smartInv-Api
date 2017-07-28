"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DepartmentModel {
    all(knex) {
        return knex('departments')
            .orderBy('department_name');
    }
    save(knex, datas) {
        return knex('departments')
            .insert(datas);
    }
    update(knex, departmentId, datas) {
        return knex('departments')
            .where('department_id', departmentId)
            .update(datas);
    }
    detail(knex, departmentId) {
        return knex('departments')
            .where('department_id', departmentId);
    }
    remove(knex, departmentId) {
        return knex('departments')
            .where('department_id', departmentId)
            .del();
    }
}
exports.DepartmentModel = DepartmentModel;
//# sourceMappingURL=department.js.map