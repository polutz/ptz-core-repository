'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getByIds = exports.getById = exports.getCollection = exports.find = exports.save = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getCollection = _ramda2.default.curry(function (db, collectionName) {
    return db.collection(collectionName);
});
var save = _ramda2.default.curry(function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(collection, entity) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return collection.replaceOne({ _id: entity.id }, entity, { upsert: true });

                    case 2:
                        result = _context.sent;

                        entity = result.ops[0];
                        return _context.abrupt('return', Promise.resolve(entity));

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());
var getById = _ramda2.default.curry(function (collection, id) {
    var query = {
        _id: id
    };
    return collection.findOne(query);
});
var getByIds = _ramda2.default.curry(function (collection, ids) {
    var query = {
        _id: {
            $in: ids
        }
    };
    return collection.find(query).toArray();
});
var find = _ramda2.default.curry(function (collection, query, options) {
    return collection.find(query, {}, options).toArray();
});
exports.save = save;
exports.find = find;
exports.getCollection = getCollection;
exports.getById = getById;
exports.getByIds = getByIds;
//# sourceMappingURL=BaseRepository.js.map
//# sourceMappingURL=BaseRepository.js.map