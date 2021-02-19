"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SOCKET = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SOCKET = (0, _socket["default"])('192.168.0.196:3001', {});
exports.SOCKET = SOCKET;