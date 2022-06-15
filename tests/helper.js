const DriverFactory = require('../lib/DriverFactory')
const driverFactory = new DriverFactory()

before(async function() {
  await driverFactory.build()
  this.driver = driverFactory.driver
})

after(async function() {
  await driverFactory.quit()
})
