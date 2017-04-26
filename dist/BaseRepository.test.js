'use strict';

var _mongodb = require('mongodb');

var _ptzAssert = require('ptz-assert');

var _ptzCoreDomain = require('ptz-core-domain');

var _index = require('./index');

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var MONGO_URL = 'mongodb://localhost:27017/relay';
var db, baseRepository;
describe('BaseRepository', function () {
    beforeEach(function () {
        return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _mongodb.MongoClient.connect(MONGO_URL);

                        case 2:
                            db = _context.sent;

                            baseRepository = new _index.BaseRepository(db, 'testCollection');

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    });
    describe('save', function () {
        it('insert', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
                var entity, entityDb;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                entity = new _ptzCoreDomain.EntityMinBase({});
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
                }, _callee2, this);
            }));
        });
        it('update', function () {
            return __awaiter(undefined, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
                var entity, newName, entityDb;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                entity = new _ptzCoreDomain.EntityMinBase({});

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
                }, _callee3, this);
            }));
        });
    });
    describe('find', function () {
        it('limit by 3');
        it('limit by 5');
    });
    describe('getOtherUsersWithSameUserNameOrEmail', function () {
        it('find by email');
        it('find by userName');
        it('not found');
    });
    describe('getByUserNameOrEmail', function () {
        it('find by email');
        it('find by userName');
        it('not found');
    });
});
//# sourceMappingURL=BaseRepository.test.js.map
//# sourceMappingURL=BaseRepository.test.js.map