'use strict';

var _ptzAssert = require('ptz-assert');

var _index = require('./index');

var index = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('ptz-core-repository', function () {
    describe('exports', function () {
        it('save', function () {
            return (0, _ptzAssert.ok)(index.save);
        });
        it('find', function () {
            return (0, _ptzAssert.ok)(index.find);
        });
        it('getCollection', function () {
            return (0, _ptzAssert.ok)(index.getCollection);
        });
        it('getById', function () {
            return (0, _ptzAssert.ok)(index.getById);
        });
        it('getByIds', function () {
            return (0, _ptzAssert.ok)(index.getByIds);
        });
    });
});
//# sourceMappingURL=index.test.js.map
//# sourceMappingURL=index.test.js.map