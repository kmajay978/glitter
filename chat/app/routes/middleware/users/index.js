const async = require('async');
const Constant = require('../../../util/constant');
const Response = require('../../../util/response');
const HttpStatus = require('http-status-codes');
const MilestoneQ = require('./query-model');
const Promise = require('bluebird');
const constants = require('../../../constants');
const _ = require('underscore');
const moment = require('moment');
const Joi = require('joi');
const i18n = require('../../../util/i18n');


/**
 * Simulates Object.entries from ES7
 * @link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
 * Note:
 * Comment this function if using NodeJS version ~ 7
 */
global.Object.entries = function (ob) {
    var list = [];
    for (const key of Object.keys(ob)) {
        list.push([key, ob[key]]);
    }
    return list;
}

module.exports = class User {

    /**
     * Configures milestone approval parameters
     * @param {Object} approvalMapList
     * Sample:
     * {
     *      requiresApproval: true,
     *      milestone_id: 4,
     *      program_id: 5,
     *      approved: [
     *          {
     *              role_id: 1,
     *              milestone_id: 2,
     *              program_id: 3
     *          },
     *          {
     *              role_id: 3,
     *              milestone_id: 12,
     *              program_id: 7
     *          }
     *      ]
     * }
     * @return {Promise}
     */
 
    static userLogin(req, res) {
        let payload = req.query;
        payload.authorization = req.headers.authorization;
        async.waterfall([
            function (cb) {
                commonFunc.authorizeCompany(payload.authorization, false, payload.phone, true, (err, company) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, user);
                    }
                });
            },
            function (user, cb) {
                const getTickets = `SELECT a.id,a.ticket_id 
                FROM tb_ticket_triggers a 
                INNER JOIN tb_tickets b ON a.ticket_id = b.ticket_id 
                WHERE a.program_milestone_id = ? AND b.status <> 0 AND b.financial_status NOT IN (3,4) AND b.company_id = ? ORDER BY ticket_id DESC LIMIT 10  `;
                let query = connection.query(getTickets, [payload.program_milestone_id,payload.company_id], (err, tickets_triggers) => {
                    if (err) {
                        cb({
                            message: constants.responseMessages.ERROR_IN_EXECUTION,
                            status: constants.responseFlags.ERROR_IN_EXECUTION,
                            data: {}
                        });
                    } else {
                        let tickets = _.uniq(_.pluck(tickets_triggers, 'ticket_id'));
                        cb(null, tickets)
                    }
                });
            },
            function (tickets,cb) {
                let results = [];
                async.eachSeries(tickets, (ticket_id,callb)=>{
                    commonFunc.getTicketTriggersWithItems(ticket_id,(err,triggers)=>{
                        results.push({ticket_id,triggers})
                        callb(null)
                    });
                },(err)=>{
                    if(err){
                        cb({
                            message: constants.responseMessages.ERROR_IN_EXECUTION,
                            status: constants.responseFlags.ERROR_IN_EXECUTION,
                            data: {}
                        });
                    }
                    else{
                        cb(null, {
                            message: constants.responseMessages.ACTION_COMPLETE,
                            status: constants.responseFlags.ACTION_COMPLETE,
                            data: results
                        });
                    }
                });
            }
        ], function(err, result){
            const response = err || result;
            res.send(response);
        });
    }


    
};

