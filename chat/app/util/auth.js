const authorizeCompany = require('../routes/commonfunction').authorizeCompany;
const authorizeVendor = require('../routes/commonfunction').authorizeVendorUser;
const authorizeFleet = require('../routes/commonfunction').authorizeFleetWithIsSub;
const hitAndTryAuthorizationAndReturn = require('../routes/commonfunction').hitAndTryAuthorizationAndReturn;
const authenticateForTicket = require('../routes/commonfunction').authenticateForTicket;
const authenticateForMultipleTickets = require('../routes/commonfunction').authenticateForMultipleTickets;
const authenticateWithUserType = require('../routes/commonfunction').authenticateWithUserType;
const superAdmin = require('../routes/super_admin');
const Promise = require('bluebird');

module.exports = class Auth {

    /**
     * Middleware to authenticate user token
     */
    static authenticate(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const authToken = req.headers.authorization;
            return new Promise((resolve, reject) => {
                authorizeCompany(authToken, false, 0, false, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        req.company = result.company_id;
                        req.user = result;
                        next();
                        resolve();
                    }
                });
            });
        }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }


    static authenticateWithProgramId(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const authToken = req.headers.authorization;
            const program_id = req.body.program_id !== '' ? req.body.program_id || req.query.program_id : 0;
            return new Promise((resolve, reject) => {
                authorizeCompany(authToken, false, program_id, true, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        req.company = result.company_id;
                        req.user = result;
                        next();
                        resolve();
                    }
                });
            });
        }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }


    /**
     * Middleware to authenticate user token
     */
    static authenticateWithProgramIdAndProjectId(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const authToken = req.headers.authorization;
            const program_id = req.body.program_id || req.query.program_id;
            const project_id = req.body.project_id || req.query.project_id;

            // if (typeof program_id === 'undefined' || typeof project_id === 'undefined') {
            //     Promise.reject('Invalid request!,program and project are required');
            // }
            return new Promise((resolve, reject) => {
                authorizeCompany(authToken, false, program_id, true, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        // user identity - is_sub 0(comapny),1(sub_user),2(user)
                        // req[user] = result
                        req.userDetails = result;
                        req.user = result;
                        next();
                        resolve();
                    }
                }, project_id, true);
            });
        }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }

    /**
     * Middleware to authenticate user token
     */
    static hitAndTryAuthorizationAndReturn(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const authToken = req.headers.authorization;

            const optionalParam = {
                byPassAgreementCheck: false,
            }
            return new Promise((resolve, reject) => {
                hitAndTryAuthorizationAndReturn(['SA','COMPANY','VENDOR','FLEET'], authToken, optionalParam, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        req.user = result;
                        next();
                        resolve();
                    }
                });
            })
        }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }

    /**
     * Middleware to authenticate user token for agreement docs
     */
    static hitAndTryAuthorizationForAgreementDoc(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const authToken = req.headers.authorization;
            const optionalParam = {
                byPassAgreementCheck: true,
                byPassUserStatusCheck: true
            }

            return new Promise((resolve, reject) => {
                hitAndTryAuthorizationAndReturn(['SA','COMPANY','VENDOR','FLEET'], authToken, optionalParam, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        req.user = result;
                        next();
                        resolve();
                    }
                });
            })
        }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }

    /**
     * Middleware to authenticate for ticket access
     */
    static authenticateForTicket(req, resp, next) {
        if(typeof req.user.user_id === "undefined" && typeof req.user.company_id === "undefined"){
            console.log("INVALID USER JSON in authenticateForTicket",req.user);
            resp.json('Invalid request');
            Promise.reject('Invalid request!');
        }
        const ticket_id = req.query.ticket_id || req.body.ticket_id || req.params.ticket_id;
        return new Promise((resolve, reject) => {
            authenticateForTicket(req.user, ticket_id, (err, result) => {
                if (err) {
                    resp.json(err);
                    reject();
                } else if(req.user.is_sub === constants.COMPANY.VENDOR_FLAG){
                    if(!(result.status === constants.ticketStatusObj.Accepted ||
                        result.status === constants.ticketStatusObj.Cancelled ||
                        result.status === constants.ticketStatusObj.Reassigned)){
                        resp.json({
                            "message": constants.responseMessages.INVALID_ACCESS,
                            "status": constants.responseFlags.SHOW_ERROR_MESSAGE,
                            "data": {}
                        });
                        reject();
                    } else {
                        // DO NOT EDIT ticket_auth
                        req.body.ticket_auth = result;
                        req.query.ticket_auth = result;
                        next();
                        resolve();
                    }
                } else {
                    // DO NOT EDIT ticket_auth
                    req.body.ticket_auth = result;
                    req.query.ticket_auth = result;
                    next();
                    resolve();
                }
            });
        })
    }

    /**
     * Middleware to authenticate for multiple tickets access
     */
    static authenticateForMultipleTickets(req, resp, next) {
        const ticket_ids = req.payload.ticket_ids;

        return new Promise((resolve, reject) => {
            authenticateForMultipleTickets(req.user, ticket_ids, (err, result) => {
                if (err) {

                    resp.json(err);
                    reject();

                } else {

                    req.ticket_auth = result;

                    next();
                    resolve();
                }
            });
        })
    }

    static authenticateVendor(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const authToken = req.headers.authorization;
            const optionalParam = {
                byPassAgreementCheck: false
            }
            return new Promise((resolve, reject) => {
                authorizeVendor(authToken, optionalParam, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        //req.company = result.company_id;
                        req.user = result;
                        next();
                        resolve();
                    }
                });
            });
        }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }

    static authenticateFleet(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const authToken = req.headers.authorization;
            const optionalParam = {
                byPassAgreementCheck: false
            }
            return new Promise((resolve, reject) => {
                authorizeFleet(authToken, optionalParam, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        req.user = result;
                        next();
                        resolve();
                    }
                });
            });
            }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }

    /**
     * Middleware to authenticate user token with user type
     */
    static authenticateWithUserType(req, resp, next) {
        if (req.headers && req.headers.authorization) {
            const access_token = req.headers.authorization;
            const optional_params = {
                byPassAgreementCheck: false,
            }

            return new Promise((resolve, reject) => {
                authenticateWithUserType(access_token, optional_params, (err, result) => {
                    if (err) {
                        resp.json(err);
                        reject();
                    } else {
                        req.user = result;
                        next();
                        resolve();
                    }
                });
            });
        }
        resp.json('Invalid request');
        Promise.reject('Invalid request!');
    }


  static createSuperAdminAuthenticateMiddleware(requireFullAccess = false) {
        requireFullAccess = false;
    return (req, res, next) => {
      if (!req.headers || !req.headers.authorization) {
        return res.json('Invalid request');
      }

      const access_token = req.headers.authorization;
      return superAdmin.authorize(access_token, requireFullAccess, (err, result) => {
        if (err) return res.json(err);
        req.user = result;
        return next();
      });
    };
  }
};
