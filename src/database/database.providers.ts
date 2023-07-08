import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://mhbcoelho99:n51wsIUnesLpKS1L@cluster0.9gs49lh.mongodb.net/'),
  },
];