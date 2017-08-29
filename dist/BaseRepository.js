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

const getDb = (() => {
    var _ref = _asyncToGenerator(function* (url) {
        return yield _mongodb.MongoClient.connect(url);
    });

    return function getDb(_x) {
        return _ref.apply(this, arguments);
    };
})();
const getDbCollection = _ramda2.default.curry((db, collectionName) => db.collection(collectionName));
const createRepository = exports.createRepository = _ramda2.default.curry((() => {
    var _ref2 = _asyncToGenerator(function* (url, collectionName) {
        const db = yield getDb(url);
        const collection = getDbCollection(db, collectionName);
        return {
            db,
            collectionName,
            getDbCollection,
            save: save(collection),
            getById: getById(collection),
            getByIds: getByIds(collection),
            find: find(collection)
        };
    });

    return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
})());
const save = _ramda2.default.curry((() => {
    var _ref3 = _asyncToGenerator(function* (collection, entity) {
        const result = yield collection.replaceOne({ _id: entity.id }, entity, { upsert: true });
        return result.ops[0];
    });

    return function (_x4, _x5) {
        return _ref3.apply(this, arguments);
    };
})());
const getById = _ramda2.default.curry((collection, id) => collection.findOne({ _id: id }));
const getByIds = _ramda2.default.curry((collection, ids) => collection.find({ _id: { $in: ids } }).toArray());
// TODO add FindOptions type to options and remove any when DefinitelyTypes
// includes find(collection, options:FindOptions)
const find = _ramda2.default.curry((collection, query, options) => collection.find(query, options).toArray());
exports.save = save;
exports.find = find;
exports.getDb = getDb;
exports.getDbCollection = getDbCollection;
exports.getById = getById;
exports.getByIds = getByIds;
//# sourceMappingURL=BaseRepository.js.map
//# sourceMappingURL=BaseRepository.js.map