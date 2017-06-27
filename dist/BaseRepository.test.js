'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MONGO_URL = 'mongodb://localhost:27017/ptz-core-repo';
var baseRepository;
describe('BaseRepository', function () {
    beforeEach(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _index.createRepository)('test-collection', MONGO_URL);

                    case 2:
                        baseRepository = _context.sent;

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));
    describe('save', function () {
        it('insert', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
            var entity, entityDb;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            entity = {
                                id: 'testid'
                            };
                            _context2.next = 3;
                            return baseRepository.save(entity);

                        case 3:
                            _context2.next = 5;
                            return baseRepository.getById(entity.id);

                        case 5:
                            entityDb = _context2.sent;

                            (0, _ptzAssert.ok)(entityDb);
                            (0, _ptzAssert.equal)(entityDb.id, entity.id);

                        case 8:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        })));
        it('update', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
            var entity, newName, entityDb;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            entity = {
                                id: 'testid'
                            };

                            entity['name'] = 'teste';
                            _context3.next = 4;
                            return baseRepository.save(entity);

                        case 4:
                            newName = 'teste2';

                            entity['name'] = newName;
                            _context3.next = 8;
                            return baseRepository.save(entity);

                        case 8:
                            _context3.next = 10;
                            return baseRepository.getById(entity.id);

                        case 10:
                            entityDb = _context3.sent;

                            (0, _ptzAssert.ok)(entityDb);
                            (0, _ptzAssert.equal)(entityDb.id, entity.id);
                            (0, _ptzAssert.equal)(entityDb['name'], newName);

                        case 14:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, undefined);
        })));
    });
    describe('find', function () {
        it('by Email', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
            var entity, query, entityDb;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            entity = {
                                id: 'testid'
                            };

                            entity['email'] = 'angeloocana@gmail.com';
                            _context4.next = 4;
                            return baseRepository.save(entity);

                        case 4:
                            query = {
                                email: entity['email']
                            };
                            _context4.next = 7;
                            return baseRepository.find(query, { limit: 1 });

                        case 7:
                            entityDb = _context4.sent;

                            (0, _ptzAssert.ok)(entityDb[0]);
                            (0, _ptzAssert.equal)(entityDb[0]['email'], entity['email']);

                        case 10:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, undefined);
        })));
        it('limit by 3', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
            var i, entity, query, entitiesDb;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            i = 0;

                        case 1:
                            if (!(i <= 6)) {
                                _context5.next = 10;
                                break;
                            }

                            entity = {
                                id: 'test' + i
                            };

                            entity['testLimit'] = true;
                            entity['i'] = i;
                            _context5.next = 7;
                            return baseRepository.save(entity);

                        case 7:
                            i++;
                            _context5.next = 1;
                            break;

                        case 10:
                            query = {
                                testLimit: true
                            };
                            _context5.next = 13;
                            return baseRepository.find(query, { limit: 3 });

                        case 13:
                            entitiesDb = _context5.sent;

                            (0, _ptzAssert.equal)(entitiesDb.length, 3);

                        case 15:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, undefined);
        })));
    });
    describe('getByIds', function () {
        it('get 3 entities by ids', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
            var entities, i, entity, entitiesDb;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            entities = [];
                            i = 0;

                        case 2:
                            if (!(i <= 6)) {
                                _context6.next = 11;
                                break;
                            }

                            entity = {
                                id: 'test' + i
                            };

                            entity['i'] = i;
                            entities.push(entity);
                            _context6.next = 8;
                            return baseRepository.save(entity);

                        case 8:
                            i++;
                            _context6.next = 2;
                            break;

                        case 11:
                            _context6.next = 13;
                            return baseRepository.getByIds([entities[0].id, entities[1].id, entities[2].id]);

                        case 13:
                            entitiesDb = _context6.sent;

                            (0, _ptzAssert.equal)(entitiesDb.length, 3);

                        case 15:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, undefined);
        })));
    });
});
//# sourceMappingURL=BaseRepository.test.js.map
//# sourceMappingURL=BaseRepository.test.js.map