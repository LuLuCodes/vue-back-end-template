var log4js = require('log4js');

log4js.configure({
  'appenders': [
    {
      'category': 'access',
      'type': 'dateFile',
      'filename': __dirname + '/logs/access.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'category': 'system',
      'type': 'dateFile',
      'filename': __dirname + '/logs/system.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'category': 'error',
      'type': 'dateFile',
      'filename': __dirname + '/logs/error.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'category': 'oss',
      'type': 'dateFile',
      'filename': __dirname + '/logs/oss.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'category': 'api',
      'type': 'dateFile',
      'filename': __dirname + '/logs/api.log',
      'pattern': '-yyyy-MM-dd',
      'backups': 10
    },
    {
      'type': 'console'
    }]
});

var environment = process.env.NODE_ENV || 'production';

if (environment === 'production') {
  log4js.getLogger('access').setLevel('INFO');
  log4js.getLogger('system').setLevel('INFO');
  log4js.getLogger('error').setLevel('INFO');
  log4js.getLogger('oss').setLevel('INFO');
  log4js.getLogger('api').setLevel('INFO');
} else {
  log4js.getLogger('access').setLevel('DEBUG');
  log4js.getLogger('system').setLevel('DEBUG');
  log4js.getLogger('error').setLevel('DEBUG');
  log4js.getLogger('oss').setLevel('DEBUG');
  log4js.getLogger('api').setLevel('DEBUG');
}

module.exports = {
  access: log4js.getLogger('access'),
  system: log4js.getLogger('system'),
  oss: log4js.getLogger('oss'),
  api: log4js.getLogger('api'),
  express: log4js.connectLogger(log4js.getLogger('access'), {level: log4js.levels.INFO, format:':remote-addr :method :url :status'}),
};
