


global.self = global;


const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


Object.defineProperty(global.self, 'crypto', {
  value: {
    subtle: {},
    getRandomValues: (arr) => {
      return require('crypto').randomFillSync(arr);
    }
  }
});
