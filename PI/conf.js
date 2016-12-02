// conf.js
exports.config = {
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.reg.tienda.js', 'spec.reg.socio.js', 'spec.reg.compra.js']
};
