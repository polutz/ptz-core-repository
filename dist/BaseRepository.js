'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getByIds = exports.getById = exports.getDbCollection = exports.getDb = exports.find = exports.save = exports.createRepository = undefined;

var _mongodb = require('mongodb');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getDb = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(url) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _mongodb.MongoClient.connect(url);

                    case 2:
                        return _context.abrupt('return', _context.sent);

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getDb(_x) {
        return _ref.apply(this, arguments);
    };
}();
var getDbCollection = _ramda2.default.curry(function (db, collectionName) {
    return db.collection(collectionName);
});
// tslint:disable-next-line:max-line-length
var createRepository = exports.createRepository = _ramda2.default.curry(function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(collectionName, url) {
        var db, collection;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return getDb(url);

                    case 2:
                        db = _context2.sent;
                        collection = getDbCollection(db, collectionName);
                        return _context2.abrupt('return', {
                            db: db,
                            collectionName: collectionName,
                            getDbCollection: getDbCollection,
                            save: save(collection),
                            getById: getById(collection),
                            getByIds: getByIds(collection),
                            find: find(collection)
                        });

                    case 5:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}());
var save = _ramda2.default.curry(function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(collection, entity) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return collection.replaceOne({ _id: entity.id }, entity, { upsert: true });

                    case 2:
                        result = _context3.sent;

                        entity = result.ops[0];
                        return _context3.abrupt('return', entity);

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}());
var getById = _ramda2.default.curry(function (collection, id) {
    return collection.findOne({ _id: id });
});
var getByIds = _ramda2.default.curry(function (collection, ids) {
    return collection.find({ _id: { $in: ids } }).toArray();
});
// TODO add FindOptions type to options and remove any when DefinitelyTypes
// includes find(collection, options:FindOptions)
var find = _ramda2.default.curry(function (collection, query, options) {
    return collection.find(query, options).toArray();
});
exports.save = save;
exports.find = find;
exports.getDb = getDb;
exports.getDbCollection = getDbCollection;
exports.getById = getById;
exports.getByIds = getByIds;
//# sourceMappingURL=BaseRepository.js.map
//# sourceMappingURL=BaseRepository.js.map