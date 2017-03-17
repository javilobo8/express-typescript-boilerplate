function mongooseConnect(mongoose, uri, options) {
  mongoose.connect(uri, options);

  mongoose.connection.once('connected', () => {
    console.log('[models] Mongoose connected');
  });

  mongoose.connection.once('error', (err) => {
    console.log('[models] Mongoose error: ', err);
    throw err;
  });

  mongoose.connection.once('disconnected', () => {
    console.log('[models] Mongoose disconnected');
  });

  process.once('SIGINT', () =>
    mongoose.connection.close(() => {
      console.error('[models] Mongoose disconnected');
      process.exit(0);
    })
  );
};

export default mongooseConnect;
