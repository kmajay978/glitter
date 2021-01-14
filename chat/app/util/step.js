const q = require('../db');
const Constant = require('./constant');

/**
 * Abstracts the functionality of a 'step' in application.
 * Each step, i.e step-1, step-2 alike represent a state
 * in the system.
 */
module.exports = class Step {

    /**
     * Updates the program step number
     * @return {Promise}
     */
  static updateProgramTo(stepNumber, programId) {
    if (typeof stepNumber === 'number') {
      return q.update(Constant.TABLE_PROGRAMS, { status: stepNumber }, { program_id: `=${programId}` });
    }
    return Promise.reject('Invalid argument passed to update step number');
  }

  static updateProjectTo(stepNumber, projectId) {
    console.log(stepNumber, projectId)
    if (typeof stepNumber === 'number') {
      return q.update(Constant.TABLE_PROJECT, { status: stepNumber }, { project_id: `=${projectId}`,status:`=1` });
    }
    return Promise.reject('Invalid argument passed to update step number');
  }
};
