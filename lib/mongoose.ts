import mongoose from 'mongoose';

declare global {
  // allow global mongoose connection caching in development
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set in environment');
}

export function connectMongoose() {
  if (!MONGODB_URI) return Promise.reject(new Error('MONGODB_URI not configured'));

  if (process.env.NODE_ENV === 'production') {
    return mongoose.connect(MONGODB_URI);
  }

  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose.connect(MONGODB_URI);
  }
  return global._mongoosePromise;
}

export default mongoose;
