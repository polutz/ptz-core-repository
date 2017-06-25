import { ok } from 'ptz-assert';
import * as index from './index';
describe('ptz-core-repository', () => {
    describe('exports', () => {
        it('save', () => ok(index.save));
        it('find', () => ok(index.find));
        it('getCollection', () => ok(index.getCollection));
        it('getById', () => ok(index.getById));
        it('getByIds', () => ok(index.getByIds));
    });
});
//# sourceMappingURL=index.test.js.map