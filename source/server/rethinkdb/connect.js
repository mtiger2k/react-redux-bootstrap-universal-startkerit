import r from 'rethinkdb';
import config from 'config';

export default function connect() {
  return r.connect(config.get('rethinkdb'));
}