import mongoose from '../mongoose';

export default function (config) {
  const {mongo} = config;
  const userPass = mongo.user && mongo.pass ? `${mongo.user}:${mongo.pass}@` : '';
  const hostProperty = [].concat(mongo.host);
  const portProperty = [].concat(mongo.port);
  const hosts = hostProperty.reduce((s, h, i) => `${s}${i > 0 ? ',' : ''}${h}:${portProperty[i] || portProperty[0]}`, '');

  const uri = `mongodb://${userPass}${hosts}/${mongo.dataBaseName}`;

  const options = mongo.options || {};

  mongoose.connect(uri, options);
}