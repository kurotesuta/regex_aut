require('./helper')
const assert = require('assert')
const RegexEditorPage = require('../pages/RegexEditorPage')

describe('Regex Editor', function() {
    describe ('Verify Regex Editor returns positive feedback if input contains valid data (Python)', function() {
        let regexEditor
        let regexString = '^a...s$'
        let regexTestString = 'abyss'
        let flavor = 'Python'
    
        before(async function() {
            regexEditor = new RegexEditorPage(this.driver)
            await regexEditor.load()
        })
    
        it('should input regular expression', async function() {
            await regexEditor.inputRegex(regexString)
        })
    
        it('should input test string', async function() {
            await regexEditor.inputTestString(regexTestString)
        })
    
        it('should choose Python as flavor', async function() {
            await regexEditor.chooseFlavor(flavor)
        })
    
        it('should show test string in match information', async function() {
            assert.equal(await regexEditor.getMatchInformationTestString(regexTestString), regexTestString)
        })
    })

    describe('Verify Regex Editor Explanation card shows default content', function() {
        let regexEditor
    
        before(async function() {
            regexEditor = new RegexEditorPage(this.driver)
            await regexEditor.load()
        })

        it('should input regular expression', async function() {
            
            let regexString = '^a...s$'
            await regexEditor.inputRegex(regexString)
        })
    
        it('should show default explanation', async function() {
            let expectedString = "An explanation of your regex will be automatically generated as you type."
            assert.equal(await regexEditor.getDefaultExplanationString(), expectedString)
        })
    })

    describe('Verify Regex Editor Match information shows error message if Test String is empty (Python)', function() {
        let regexEditor
        let regexString = '^a...s$'
        let flavor = 'Python'
    
        before(async function() {
            regexEditor = new RegexEditorPage(this.driver)
            await regexEditor.load()
        })

        it('should input regular expression', async function() {
            await regexEditor.inputRegex(regexString)
        })

        it('should choose Python as flavor', async function() {
            await regexEditor.chooseFlavor(flavor)
        })
    
        it('should show error message if Test String is empty', async function() {
            let expectedString = "Your regular expression does not match the subject string."
            assert.equal(await regexEditor.getMatchInformationErrorMessage(), expectedString)
        })
    })

    describe('Verify Substitution Function section is shown', function() {
        let regexEditor
        let func = 'Substitution'
    
        before(async function() {
            regexEditor = new RegexEditorPage(this.driver)
            await regexEditor.load()
        })

        it('should choose Substitution as Function', async function() {
            await regexEditor.chooseFunction(func)
        })

        it('should show Substitution textbox', async function() {
            await assert(regexEditor.substitutionTextBoxIsDisplayed())
        })
    })

    describe('Verify Reference search returns expected result', function() {
        let regexEditor
        let searchReferenceString = '[abc]'
    
        before(async function() {
            regexEditor = new RegexEditorPage(this.driver)
            await regexEditor.load()
        })

        it('should input search term in Reference search textbox', async function() {
            await regexEditor.inputSearchReferenceString(searchReferenceString)
            await this.driver.sleep(2000)
        })

        it('should input search term in Reference search textbox', async function() {
            let expectedResult = 'A single character of'
            await assert(regexEditor.referenceCardResultIsDisplayed(expectedResult))
        })
    })
})
