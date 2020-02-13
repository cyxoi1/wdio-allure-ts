"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const allure_reporter_1 = __importDefault(require("@wdio/allure-reporter"));
const chalk_1 = __importDefault(require("chalk"));
/**
 * Print to standard output
 */
const printToConsole = true;
const DEBUG = '[DEBUG]';
const DEBUG_COLOR = chalk_1.default.gray;
const STEP = '[STEP]';
const STEP_COLOR = chalk_1.default.green;
const WARNING = '[WARNING]';
const WARNING_COLOR = chalk_1.default.yellow;
const ERROR = '[ERROR]';
const ERROR_COLOR = chalk_1.default.red;
/**
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
var Reporter;
(function (Reporter) {
    /**
     * Close step in report
     */
    function closeStep(isFailed) {
        console.log(isFailed);
        browser.takeScreenshot();
        allure_reporter_1.default.addAttachment('Page HTML source', `${browser.getPageSource()}`);
        allure_reporter_1.default.addAttachment('Browser console logs', `${JSON.stringify(browser.getLogs('browser'), undefined, 2)}`);
    }
    Reporter.closeStep = closeStep;
    /**
     * Log step message
     * console log with green color text
     * @param msg text to log
     */
    function step(msg) {
        toConsole(msg, STEP, STEP_COLOR);
        allure_reporter_1.default.addStep(`[STEP] - ${msg}`);
    }
    Reporter.step = step;
    /**
     * Log  debug message
     * console log with grey color text
     * @param msg text to log
     */
    function debug(msg) {
        toConsole(msg, DEBUG, DEBUG_COLOR);
        allure_reporter_1.default.addStep(`[DEBUG] - ${msg}`);
    }
    Reporter.debug = debug;
    /**
     * Log warning message
     * console log with yellow color text
     * @param msg text to log
     */
    function warning(msg) {
        toConsole(msg, WARNING, WARNING_COLOR);
        allure_reporter_1.default.addStep(`[WARNING] - ${msg}`);
    }
    Reporter.warning = warning;
    /**
     * Log error message
     * console log with red color text
     * @param msg text to log
     */
    function error(msg) {
        toConsole(msg, ERROR, ERROR_COLOR);
        allure_reporter_1.default.addStep(`[ERROR] - ${msg}`);
    }
    Reporter.error = error;
})(Reporter = exports.Reporter || (exports.Reporter = {}));
/**
 * Adding Environment to allure report
 * @param name name of the env
 * @param value string
 */
function addEnvironment(name, value) {
    allure_reporter_1.default.addEnvironment(name, value);
}
exports.addEnvironment = addEnvironment;
/**
 * Adding issue name
 * @param value name of the feature
 */
function addTestId(value) {
    allure_reporter_1.default.addTestId(value);
}
exports.addTestId = addTestId;
/**
 * Adding description name
 * @param description of the test
 * @param descriptionType type (String, optional) – description type, text by default. Values ['text', 'html','markdown']
 */
function addDescription(description, descriptionType) {
    allure_reporter_1.default.addDescription(description, descriptionType);
}
exports.addDescription = addDescription;
/*
 * Message with type stamp, log type and test name
 * @param logLevel message level info/error/warning/debug
 * @param msg text to log
 */
function prettyMessage(logLevel, msg) {
    const dateString = getDate();
    return `${dateString} ${logLevel} ${msg}`;
}
/**
 * Date for log message
 */
function getDate() {
    return new Date()
        .toISOString() // will return like '2012-11-04T14:51:06.157Z'
        .replace(/T/, ' ') // replace T with a space
        .replace(/\..+/, ''); // delete the dot and everything after
}
/**
 * Print message to console`
 * @param msg message to log
 * @param level message level
 * @param color message color
 */
function toConsole(msg, level, color) {
    if (printToConsole) {
        const messageToLog = prettyMessage(level, msg);
        console.log(color(messageToLog));
    }
}
