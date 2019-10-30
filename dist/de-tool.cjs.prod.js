'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * verify mobile
 * @param {*} mobile
 */
function verifyMobile(mobile) {
    return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile);
}

exports.verifyMobile = verifyMobile;
