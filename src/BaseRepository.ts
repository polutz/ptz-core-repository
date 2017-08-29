import { Collection, Db, MongoClient } from 'mongodb';
import { ICreateRepository, IEntityMinBase, IGetDbCollection } from 'ptz-core-domain';
import R from 'ramda';

const getDb = async (url: string) => await MongoClient.connect(url);

const getDbCollection: IGetDbCollection =
    R.curry((db: Db, collectionName: string) => db.collection<IEntityMinBase>(collectionName));

export const createRepository: ICreateRepository = R.curry(async <T> (url: string, collectionName: string) => {
    const db = await getDb(url);
    const collection = getDbCollection<T>(db, collectionName);
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

    return result.ops[0];
});

const getById = R.curry((collection: Collection, id: string) => collection.findOne({ _id: id }));

const getByIds = R.curry((collection: Collection, ids: string[]) => collection.find({ _id: { $in: ids } }).toArray());

// TODO add FindOptions type to options and remove any when DefinitelyTypes
// includes find(collection, options:FindOptions)
const find = R.curry((collection: Collection | any, query: any, options: { limit: number }) =>
    collection.find(query, options).toArray());

export { save, find, getDb, getDbCollection, getById, getByIds };
