// No database connection needed - using file storage
export const connectDb = async () => {
  console.log('Using file storage - no database connection required');
  return Promise.resolve();
};