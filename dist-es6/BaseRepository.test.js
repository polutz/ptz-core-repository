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
            let entity = new EntityMinBase({});
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
//# sourceMappingURL=BaseRepository.test.js.map