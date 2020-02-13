import allureReporter from '@wdio/allure-reporter';
import chalk, { Chalk } from 'chalk';

/**
 * Print to standard output
 */
const printToConsole: boolean = true;

const DEBUG: string = '[DEBUG]';
const DEBUG_COLOR: Chalk = chalk.gray;
const STEP: string = '[STEP]';
const STEP_COLOR: Chalk = chalk.green;
const WARNING: string = '[WARNING]';
const WARNING_COLOR: Chalk = chalk.yellow;
const ERROR: string = '[ERROR]';
const ERROR_COLOR: Chalk = chalk.red;

/**
 * Log to standard system out and allure report
 *
 * Each 'Step' log accumulate additional logs as attachment
 * until new 'Step' log arrived
 */
export namespace Reporter {
  /**
   * Close step in report
   */
  export function closeStep(isFailed?: boolean): void {
    console.log(isFailed);
    browser.takeScreenshot();
    allureReporter.addAttachment('Page HTML source', `${browser.getPageSource()}`);
    allureReporter.addAttachment('Browser console logs', `${JSON.stringify(browser.getLogs('browser'), undefined, 2)}`);
  }

  /**
   * Log step message
   * console log with green color text
   * @param msg text to log
   */
  export function step(msg: string): void {
    toConsole(msg, STEP, STEP_COLOR);

    allureReporter.addStep(`[STEP] - ${msg}`);
  }

  /**
   * Log  debug message
   * console log with grey color text
   * @param msg text to log
   */
  export function debug(msg: string): void {
    toConsole(msg, DEBUG, DEBUG_COLOR);
    allureReporter.addStep(`[DEBUG] - `,[msg]);

  }

  /**
   * Log warning message
   * console log with yellow color text
   * @param msg text to log
   */
  export function warning(msg: string): void {
    toConsole(msg, WARNING, WARNING_COLOR);
    allureReporter.addStep(`[WARNING] - ${msg}`);
  }

  /**
   * Log error message
   * console log with red color text
   * @param msg text to log
   */
  export function error(msg: string): void {
    toConsole(msg, ERROR, ERROR_COLOR);
    allureReporter.addStep(`[ERROR] - ${msg}`);
  }
}
/**
 * Adding Environment to allure report
 * @param name name of the env
 * @param value string
 */
export function addEnvironment(name: string, value?: string): void {
  allureReporter.addEnvironment(name, value);
}

/**
 * Adding issue name
 * @param value name of the feature
 */
export function addTestId(value: string): void {
  allureReporter.addTestId(value);
}

/**
 * Adding description name
 * @param description of the test
 * @param descriptionType type (String, optional) – description type, text by default. Values ['text', 'html','markdown']
 */
export function addDescription(description: string, descriptionType?: string): void {
  allureReporter.addDescription(description, descriptionType);
}

/*
 * Message with type stamp, log type and test name
 * @param logLevel message level info/error/warning/debug
 * @param msg text to log
 */
function prettyMessage(logLevel: string, msg: string): string {
  const dateString: string = getDate();

  return `${dateString} ${logLevel} ${msg}`;
}

/**
 * Date for log message
 */
function getDate(): string {
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
function toConsole(msg: string, level: string, color: Chalk): void {
  if (printToConsole) {
    const messageToLog: string = prettyMessage(level, msg);
    console.log(color(messageToLog));
  }
}
