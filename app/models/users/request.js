"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestModel {
    saveSummary(knex, datas) {
        return knex('request')
            .insert(datas, 'request_id');
    }
    saveDetail(knex, datas) {
        return knex('request_detail')
            .insert(datas);
    }
    removeRequest(knex, requestId, userId, deletedTime) {
        return knex('request')
            .where('request_id', requestId)
            .update({
            is_deleted: 'Y',
            deleted_by_user_id: userId,
            deleted_time: deletedTime
        });
    }
    getRequest(knex, departmentId) {
        let queryTotal = knex('request_detail as rd')
            .count('*')
            .whereRaw('rd.request_id=r.request_id')
            .groupBy('rd.request_id')
            .limit(1)
            .as('total_products');
        return knex('request as r')
            .select('r.*', 'w.warehouse_name', 'u.fullname as user_fullname', queryTotal)
            .leftJoin('warehouses as w', 'w.warehouse_id', 'r.warehouse_id')
            .leftJoin('users as u', 'u.id', 'r.user_id')
            .where('r.department_id', departmentId)
            .where('r.is_deleted', '<>', 'Y')
            .orderBy('r.request_id', 'DESC');
    }
}
exports.RequestModel = RequestModel;
//# sourceMappingURL=request.js.map