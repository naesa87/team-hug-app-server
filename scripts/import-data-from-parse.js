/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 */

 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var importObject = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ClassType, attributes) {
    var obj, key, value;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            obj = new ClassType();
            _context.t0 = regeneratorRuntime.keys(attributes);

          case 2:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 11;
              break;
            }

            key = _context.t1.value;

            if (!BLACKLISTED_KEYS.has(key)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('continue', 2);

          case 6:
            value = attributes[key];

            if (Array.isArray(value)) {
              value = value.map(convertPointer);
            }
            obj.set(key, value);
            _context.next = 2;
            break;

          case 11:
            _context.next = 13;
            return obj.save();

          case 13:
            obj = _context.sent;

            ID_MAP.set(attributes.objectId, obj.id);
            return _context.abrupt('return', obj);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function importObject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var importClass = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(className) {
    var response, _ref3, results, ClassType;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('Loading', className);
            _context2.next = 3;
            return (0, _isomorphicFetch2.default)('https://api.parse.com/1/classes/' + className, {
              method: 'get',
              headers: {
                'X-Parse-Application-Id': 'R0yDMIKCUyEke2UiadcTBBGd1L5hMBTGJSdBNL3W',
                'X-Parse-JavaScript-Key': 'BJ5V0APFMlvmCBPDXl9Mgh3q3dFrs18XkQz6A2bO',
                'Content-Type': 'application/json'
              }
            });

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();

          case 6:
            _ref3 = _context2.sent;
            results = _ref3.results;
            ClassType = _node2.default.Object.extend(className);

            console.log('Cleaning old', className, 'data');
            _context2.next = 12;
            return new _node2.default.Query(ClassType).each(function (record) {
              return record.destroy();
            });

          case 12:
            console.log('Converting', className);
            return _context2.abrupt('return', Promise.all(results.map(function (attrs) {
              return importObject(ClassType, attrs);
            })));

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function importClass(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var createSurvey = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(session) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new Survey({
              session: session,
              q1: 'How useful did you find the content from this session?',
              q2: 'How likely are you to implement the products/techniques covered in this session?'
            }).save();

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function createSurvey(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var main = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var sessions;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return importClass('Speakers');

          case 2:
            _context4.next = 4;
            return importClass('Agenda');

          case 4:
            sessions = _context4.sent;


            console.log('Generating sample survey questions');
            _context4.next = 8;
            return new _node2.default.Query(Survey).each(function (record) {
              return record.destroy();
            });

          case 8:
            _context4.next = 10;
            return sessions.map(function (s) {
              return s.get('hasDetails') ? createSurvey(s) : Promise.resolve(null);
            });

          case 10:
            _context4.next = 12;
            return Promise.all([importClass('FAQ'), importClass('Maps'), importClass('Notification'), importClass('Page')]);

          case 12:
            return _context4.abrupt('return', 'OK');

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function main() {
    return _ref5.apply(this, arguments);
  };
}();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _node = require('parse/node');

var _node2 = _interopRequireDefault(_node);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _parseServer = require('parse-server');

var _parseDashboard = require('parse-dashboard');

var _parseDashboard2 = _interopRequireDefault(_parseDashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SERVER_PORT = process.env.PORT || 8080;
var SERVER_HOST = process.env.HOST || 'localhost';
var APP_ID = process.env.APP_ID || 'oss-f8-app-2016';
var MASTER_KEY = process.env.MASTER_KEY || '70c6093dba5a7e55968a1c7ad3dd3e5a74ef5cac';
var DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/dev';
var IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
var DASHBOARD_AUTH = process.env.DASHBOARD_AUTH || null;
var SERVER_URL = process.env.SERVER_URL || 'http://localhost:' + SERVER_PORT + '/parse';

_node2.default.initialize(APP_ID);
_node2.default.serverURL = SERVER_URL;
_node2.default.masterKey = MASTER_KEY;
_node2.default.DASHBOARD_AUTH = DASHBOARD_AUTH;
_node2.default.Cloud.useMasterKey();


var BLACKLISTED_KEYS = new Set(['objectId', 'createdAt', 'updatedAt']);
var ID_MAP = new Map();

function convertPointer(pointer) {
  if (pointer.__type === 'Pointer') {
    return _extends({}, pointer, { objectId: ID_MAP.get(pointer.objectId) || pointer.objectId });
  }
  return pointer;
}

var Survey = _node2.default.Object.extend('Survey');

main().then(console.dir, console.error);
