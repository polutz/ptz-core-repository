var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from 'mongodb';
import { equal, ok } from 'ptz-assert';
import { EntityMinBase } from 'ptz-core-domain';
import { BaseRepository } from './index';
const MONGO_URL = 'mongodb://localhost:27017/relay';
var db, baseRepository;
describe('BaseRepository', () => {
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        db = yield MongoClient.connect(MONGO_URL);
        baseRepository = new BaseRepository(db, 'testCollection');
    }));
    describe('save', () => {
        it('insert', () => __awaiter(this, void 0, void 0, function* () {
            const entity = new EntityMinBase({});
            yield baseRepository.save(entity);
            const entityDb = yield baseRepository.getById(entity.id);
            ok(entityDb);
            equal(entityDb.id, entity.id);
        }));
        it('update', () => __awaiter(this, void 0, void 0, function* () {
            const entity = new EntityMinBase({});
            entity['name'] = 'teste';
            yield baseRepository.save(entity);
            const newName = 'teste2';
            entity['name'] = newName;
            yield baseRepository.save(entity);
            const entityDb = yield baseRepository.getById(entity.id);
            ok(entityDb);
            equal(entityDb.id, entity.id);
            equal(entityDb['name'], newName);
        }));
    });
    describe('find', () => {
        it('by Email', () => __awaiter(this, void 0, void 0, function* () {
            const entity = new EntityMinBase({});
            entity['email'] = 'angeloocana@gmail.com';
            yield baseRepository.save(entity);
            const query = {
                email: entity['email']
            };
            const entityDb = yield baseRepository.find(query, { limit: 1 });
            ok(entityDb[0]);
            equal(entityDb[0]['email'], entity['email']);
        }));
        it('limit by 3', () => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i <= 6; i++) {
                const entity = new EntityMinBase({});
                entity['testLimit'] = true;
                entity['i'] = i;
                yield baseRepository.save(entity);
            }
            const query = {
                testLimit: true
            };
            const entitiesDb = yield baseRepository.find(query, { limit: 3 });
            equal(entitiesDb.length, 3);
        }));
    });
});
//# sourceMappingURL=BaseRepository.test.js.map