'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = exports.Params = exports.DeleteMapping = exports.PutMapping = exports.PostMapping = exports.GetMapping = undefined;

var _YanClient = require('./annotation/YanClient');

var _YanClient2 = _interopRequireDefault(_YanClient);

var _GetMapping = require('./annotation/GetMapping');

var _GetMapping2 = _interopRequireDefault(_GetMapping);

var _PostMapping = require('./annotation/PostMapping');

var _PostMapping2 = _interopRequireDefault(_PostMapping);

var _PutMapping = require('./annotation/PutMapping');

var _PutMapping2 = _interopRequireDefault(_PutMapping);

var _DeleteMapping = require('./annotation/DeleteMapping');

var _DeleteMapping2 = _interopRequireDefault(_DeleteMapping);

var _Params = require('./annotation/Params');

var _Params2 = _interopRequireDefault(_Params);

var _Header = require('./annotation/Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _YanClient2.default;
exports.GetMapping = _GetMapping2.default;
exports.PostMapping = _PostMapping2.default;
exports.PutMapping = _PutMapping2.default;
exports.DeleteMapping = _DeleteMapping2.default;
exports.Params = _Params2.default;
exports.Header = _Header2.default;