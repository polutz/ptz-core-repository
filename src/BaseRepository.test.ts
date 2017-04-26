import { MongoClient } from 'mongodb';
import { equal, ok } from 'ptz-assert';
import { EntityMinBase } from 'ptz-core-domain';
import { BaseRepository } from './index';

const MONGO_URL = 'mongodb://localhost:27017/relay';
var db, baseRepository;

/* tslint:disable:no-string-literal */
/* tslint:disable:prefer-const */

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
            let entity = new EntityMinBase({});

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
        it('limit by 3');
        it('limit by 5');
    });

    describe('getOtherUsersWithSameUserNameOrEmail', () => {
        it('find by email');
        it('find by userName');
        it('not found');
    });

    describe('getByUserNameOrEmail', () => {
        it('find by email');
        it('find by userName');
        it('not found');
    });
});

/* tslint:enable:no-string-literal */
/* tslint:enable:prefer-const */
