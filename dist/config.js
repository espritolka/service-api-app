'use strict';

var nconf = require('nconf');
nconf.argv().env().file({ file: './bin/config.json' });

module.exports = nconf;