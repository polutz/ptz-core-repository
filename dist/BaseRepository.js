'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getByIds = exports.getById = exports.getDbCollection = exports.getDb = exports.find = exports.save = exports.createRepository = undefined;

var _mongodb = require('mongodb');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getDb = async url => await _mongodb.MongoClient.connect(url);
const getDbCollection = _ramda2.default.curry((db, collectionName) => db.collection(collectionName));
// tslint:disable-next-line:max-line-length
const createRepository = exports.createRepository = _ramda2.default.curry(async (collectionName, url) => {
    const db = await getDb(url);
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
const save = _ramda2.default.curry(async (collection, entity) => {
    const result = await collection.replaceOne({ _id: entity.id }, entity, { upsert: true });
    entity = result.ops[0];
    return entity;
});
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