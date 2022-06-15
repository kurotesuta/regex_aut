# Test Automation Framework (Selenium)

This is a demo framework (UI) that runs a set of tests against [Regex101](https://regex101.com/).

## Getting Started

This framework utilizes Webdriver Manager, to install:

```shell
npm install -g webdriver-manager
```

Then, we set up a Selenium server

```shell
webdriver-manager update
```

After, we start the Selenium server

```shell
webdriver-manager start --detach
```
Note: By fault, selenium server will run on http://localhost:4444/wd/hub

See [Webdriver Manager](https://github.com/angular/webdriver-manager) repository for more info.

This framework also utilizes MochaJS, to install:

```shell
npm install --global mocha
```

See [MochaJS](https://github.com/mochajs/mocha) repository for more info.

Once this is done, we install all dependecies:

```shell
npm install
```

## Running Tests

To run all tests available:

```shell
npm test
```

## Troubleshooting

Error: webdriver-manager.ps1 cannot be loaded because running scripts is disabled on this system. (Windows)

```shell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

## Known Issues

Scenario: Reload site? Pop-up won't dismiss

Tried different solutions and this issue reminds, requires further investigation. Tests will be working fine, however.
