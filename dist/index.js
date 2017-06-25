'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseRepository = require('./BaseRepository');

Object.keys(_BaseRepository).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseRepository[key];
    }
  });
});
//# sourceMappingURL=index.js.map