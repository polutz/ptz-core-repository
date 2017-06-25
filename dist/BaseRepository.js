"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getDbCollection = function getDbCollection(db, collectionName) {
    return db.collection(collectionName);
};
var save = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(entity, db, collectionName) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getDbCollection(db, collectionName).replaceOne({ _id: entity.id }, entity, { upsert: true });

                    case 2:
                        result = _context.sent;

                        entity = result.ops[0];
                        return _context.abrupt("return", Promise.resolve(entity));

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function save(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();
var getById = function getById(id, db, collectionName) {
    var query = {
        _id: id
    };
    return getDbCollection(db, collectionName).findOne(query);
};
var getByIds = function getByIds(ids, db, collectionName) {
    var query = {
        _id: {
            $in: ids
        }
    };
    return getDbCollection(db, collectionName).find(query).toArray();
};
var find = function find(query, options, db, collectionName) {
    var result = getDbCollection(db, collectionName).find(query, {}, options).toArray();
    return result;
};
exports.save = save;
exports.find = find;
exports.getDbCollection = getDbCollection;
exports.getById = getById;
exports.getByIds = getByIds;
//# sourceMappingURL=BaseRepository.js.map
//# sourceMappingURL=BaseRepository.js.map