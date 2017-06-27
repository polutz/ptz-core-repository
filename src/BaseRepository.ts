import { Collection, Db, FindOptions, MongoClient } from 'mongodb';
import { IEntityMinBase } from 'ptz-core-domain';
import R from 'ramda';

const getDb = async (url: string) => await MongoClient.connect(url);

const getDbCollection = R.curry((db: Db, collectionName: string) => db.collection<IEntityMinBase>(collectionName));

// tslint:disable-next-line:max-line-length
export const createRepository = R.curry(async (collectionName: string, url: string) => {
    const db = await getDb(url);
    const collection = getDbCollection(db, collectionName);
    return {
        db,
        collectionName,
        getDbCollection,
        save: save(collection),
        getById: getById(collection),
        getByIds: getByIds(collection),
        find: find(collection),
    };
});

const save = R.curry(async (collection: Collection, entity: IEntityMinBase) => {
    const result = await collection.replaceOne({ _id: entity.id }, entity, { upsert: true });

    entity = result.ops[0];
    return entity;
});

const getById = R.curry((collection: Collection, id: string) => collection.findOne({ _id: id }));

const getByIds = R.curry((collection: Collection, ids: string[]) => collection.find({ _id: { $in: ids } }).toArray());

const find = R.curry((collection: Collection, query: any, options: FindOptions) =>
    collection.find(query, options).toArray());

export { save, find, getDb, getDbCollection, getById, getByIds };
