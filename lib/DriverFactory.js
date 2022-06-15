const { Builder } = require('selenium-webdriver')
const seleniumServerUrl = 'http://localhost:4444/wd/hub'

const capabilities = {
  browserName: 'chrome',
  unhandledPromptBehavior: 'accept',
  chromeOptions: {
    'args': ['--disable-popup-blocking','--no-sandbox'],
  }
}

class DriverFactory {
  async build() {
    this.driver = await new Builder()
        .usingServer(seleniumServerUrl)
        .withCapabilities(capabilities)
        .build();
    await this.driver.manage().window().maximize();
  }

  async quit() {
    await this.driver.quit()
  }
}

module.exports = DriverFactory
