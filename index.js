var fs = require('fs');

var pkg = fs.readFileSync('package.json', 'utf-8');
var dependencies = Object.keys(
  JSON.parse(pkg).dependencies
);

function createInstance(klass, params) {
  var Klass = require(klass);
  return new Klass(params);
}

module.exports = function(configs) {
  return dependencies.map(function(dependency) {
    var service = {};
    var name = dependency.split(/\-|\.|\_/)[0];
    var config = configs[name];
    var instance = createInstance(dependency, config);
    service[name] = instance;
    return service;
  }).reduce(function(pv, cv) {
    return Object.assign(pv, cv);
  }, {});
};
