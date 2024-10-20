export default async function globalTeardown() {
  if (global.__MONGOINSTANCE) {
    await global.__MONGOINSTANCE.stop()
    console.log('In-memory MongoDB server stopped')
  }
}
