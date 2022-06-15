const {By, until, Key}  = require('selenium-webdriver');

const PYTHON_FLAVOR = '//*/text()[normalize-space(.)="Python"]/parent::*'
const SUBSTITUTION = '//*/text()[normalize-space(.)="Substitution"]/parent::*'
const REGEX_TEXTBOX = '//*[contains(@aria-label, "insert your regular expression here")]'
const TEST_STRING_TEXTAREA = '//*[contains(@aria-label, "insert your test string here")]'
const SUBSTITUTION_TEXTBOX = '//*[contains(@aria-label, "insert your replacement value here")]'
const REFERENCE_CARD_TEXTBOX = '//*[contains(@placeholder, "Search reference")]'
const TIME_OUT = 10000 // wait in ms

class RegexEditorPage {
    constructor(driver) {
        this.driver = driver
    }

    async load() {
        await this.driver.get('https://regex101.com')
        const documentInitialised = () => this.driver.executeScript('return document.readyState');
        await this.driver.wait(() => documentInitialised(), TIME_OUT);
    }

    async chooseFlavor(flavor) {
        switch(flavor)
        {
            case 'Python':
                await this.driver.findElement(By.xpath(PYTHON_FLAVOR)).click()
        }
    }

    async chooseFunction(func) {
        switch(func)
        {
            case 'Substitution':
                await this.driver.findElement(By.xpath(SUBSTITUTION)).click()
        }
    }

    /**
     * Enters a string in Regular Expression Textbox (Regex Editor).
     * @function inputRegex
     * @public
     * @param {String} text Text to use in Regular Expression textbox area.
     */
    async inputRegex(text) {
        await this.driver.actions().sendKeys(Key.ESCAPE).perform();
        let textbox = await this.driver.wait(until.elementLocated(By.xpath(REGEX_TEXTBOX)), TIME_OUT)
        await textbox.sendKeys(text)
    }

    /**
     * Enters a string in Test String textbox area (Regex Editor).
     * @function inputTestString
     * @public
     * @param {String} text Text to use in Test String textbox area.
     */
    async inputTestString(text) {
        const TEST_STRING_INACTIVE_TEXTAREA = '(//div[contains(@class, "CodeMirror-show-whitespace")])[2]'

        let textAreaInactive = await this.driver.wait(until.elementLocated(By.xpath(TEST_STRING_INACTIVE_TEXTAREA)), TIME_OUT)
        await textAreaInactive.click()

        let textArea = await this.driver.findElement(By.xpath(TEST_STRING_TEXTAREA))
        await textArea.sendKeys(text)
    }

    async inputSearchReferenceString(text) {
        let textBox = await this.driver.wait(until.elementLocated(By.xpath(REFERENCE_CARD_TEXTBOX)), TIME_OUT)
        await textBox.sendKeys(text)
    }

    async getMatchInformationTestString(text) {
        const CURRENT_TEST_STRING = "//*/text()[normalize-space(.)='" + text +"']/parent::*"
        let testString = await this.driver.wait(until.elementLocated(By.xpath(CURRENT_TEST_STRING)), TIME_OUT).getText()

        return testString
    }

    async getMatchInformationErrorMessage() {
        const CURRENT_MATCH_INFO_STRING = "//*[text()='Your regular expression does not match the subject string.'] "
        let testString = await this.driver.wait(until.elementLocated(By.xpath(CURRENT_MATCH_INFO_STRING)), TIME_OUT).getText()

        return testString
    }

    async getDefaultExplanationString() {
        const CURRENT_EXPLANATION_STRING = "(.//*[normalize-space(text()) and normalize-space(.)='Explanation'])[1]/following::div[3]"
        let defaultExplanationString = await this.driver.wait(
            until.elementLocated(By.xpath(CURRENT_EXPLANATION_STRING)), TIME_OUT).getText()

        return defaultExplanationString
    }

    async substitutionTextBoxIsDisplayed() {
        let substitutionTextBox = await this.driver.wait(
            until.elementLocated(By.xpath(SUBSTITUTION_TEXTBOX)), TIME_OUT).isDisplayed
        return substitutionTextBox
    }

    async referenceCardResultIsDisplayed(text) {
        let resultString = await this.driver.wait(
            until.elementLocated(By.xpath("//*[text()='" + text +"']")), TIME_OUT).isDisplayed
        return resultString
    }
}

module.exports = RegexEditorPage
