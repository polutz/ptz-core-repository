import { IEntityMinBase } from 'ptz-core-domain';
import R from 'ramda';

const getDbCollection = R.curry((db: any, collectionName: string) => {
    return db.collection(collectionName);
});

const save = R.curry(async (fnGetDbCollection: any, entity: IEntityMinBase) => {
    const result = await fnGetDbCollection
        .replaceOne({ _id: entity.id }, entity, { upsert: true });
    entity = result.ops[0];
    return Promise.resolve(entity);
});

const getById = R.curry((fnGetDbCollection: any, id: string) => {
    const query = {
        _id: id
    };

    return fnGetDbCollection
        .findOne(query);
});

const getByIds = R.curry((fnGetDbCollection: any, ids: string[]) => {
    const query = {
        _id: {
            $in: ids
        }
    };

    return fnGetDbCollection
        .find(query)
        .toArray();
});

const find = R.curry((fnGetDbCollection: any, query: any, options: { limit: number }) => {
    const result = fnGetDbCollection
        .find(query, {}, options)
        .toArray();

    return result;
});

export { save, find, getDbCollection, getById, getByIds };
