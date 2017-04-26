import { MongoClient } from 'mongodb';
import { equal, ok } from 'ptz-assert';
import { EntityMinBase, IBaseRepository } from 'ptz-core-domain';
import { BaseRepository } from './index';

const MONGO_URL = 'mongodb://localhost:27017/relay';
var db, baseRepository: IBaseRepository<any>;

/* tslint:disable:no-string-literal */

describe('BaseRepository', () => {
    beforeEach(async () => {
        db = await MongoClient.connect(MONGO_URL);
        baseRepository = new BaseRepository(db, 'testCollection');
    });

    describe('save', () => {
        it('insert', async () => {
            const entity = new EntityMinBase({});

            await baseRepository.save(entity);

            const entityDb = await baseRepository.getById(entity.id);

            ok(entityDb);
            equal(entityDb.id, entity.id);
        });

        it('update', async () => {
            const entity = new EntityMinBase({});

            entity['name'] = 'teste';

            await baseRepository.save(entity);

            const newName = 'teste2';
            entity['name'] = newName;

            await baseRepository.save(entity);

            const entityDb = await baseRepository.getById(entity.id);

            ok(entityDb);
            equal(entityDb.id, entity.id);
            equal(entityDb['name'], newName);
        });
    });

    describe('find', () => {
        it('by Email', async () => {
            const entity = new EntityMinBase({});

            entity['email'] = 'angeloocana@gmail.com';

            await baseRepository.save(entity);

            const query = {
                email: entity['email']
            };

            const entityDb = await baseRepository.find(query, { limit: 1 });

            ok(entityDb[0]);
            equal(entityDb[0]['email'], entity['email']);
        });

        it('limit by 3', async () => {
            for (let i = 0; i <= 6; i++) {
                const entity = new EntityMinBase({});
                entity['testLimit'] = true;
                entity['i'] = i;
                await baseRepository.save(entity);
            }

            const query = {
                testLimit: true
            };

            const entitiesDb = await baseRepository.find(query, { limit: 3 });

            equal(entitiesDb.length, 3);
        });
    });
});

/* tslint:enable:no-string-literal */
