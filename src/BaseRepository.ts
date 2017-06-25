import { Collection, Db, WriteOpResult } from 'mongodb';
import { IEntityMinBase } from 'ptz-core-domain';
import R from 'ramda';

const getCollection = R.curry((db: Db, collectionName: string) =>
    db.collection<IEntityMinBase>(collectionName)
);

const save = R.curry(async (collection: Collection | any, entity: IEntityMinBase) => {
    const result = await collection
        .replaceOne({ _id: entity.id }, entity, { upsert: true }) as WriteOpResult;

    entity = result.ops[0];
    return Promise.resolve(entity);
});

const getById = R.curry((collection: Collection<IEntityMinBase>, id: string) => {
    const query = {
        _id: id
    };

    return collection
        .findOne(query);
});

const getByIds = R.curry((collection: Collection<IEntityMinBase>, ids: string[]) => {
    const query = {
        _id: {
            $in: ids
        }
    };

    return collection
        .find(query)
        .toArray();
});

const find = R.curry((collection: Collection<IEntityMinBase> | any, query: any, options: { limit: number }) =>
    collection.find(query, {}, options).toArray()
);

export { save, find, getCollection, getById, getByIds };
