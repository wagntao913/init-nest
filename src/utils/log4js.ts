import * as Path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import * as Moment from 'moment';
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import config from '../../config/log4js';

// 日志级别
export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
}

// 内容跟踪类
export class ContextTrace {
  constructor(
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
}

Log4js.addLayout('Awesome-nest', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent) => {
    let moduleName: any = '';
    let position: any = '';

    // 日志组装
    const messageList = [];
    logEvent.data.forEach(value => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber},${value.columnNumber}`;
        }
        return;
      }

      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    });

    const messageOutput = messageList.join(' ');
    const positionOutput = position ? `[${position}]` : ``;
    const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   -`;
    const dateOutput = `${Moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    const moduleOutput = moduleName ? `[${moduleName}]` : '[LoggerService]';
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;

    // 根据日志级别，用不同颜色区分
    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }
    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(
      moduleOutput,
    )}${levelOutput}${positionOutput}`;
  };
});

Log4js.configure(config);

const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class Logger {
  static trace(...args): any {
    logger.trace(Logger.getStackTrace(), ...args);
  }

  static debug(...args): any {
    logger.debug(Logger.getStackTrace(), ...args);
  }

  static log(...args): any {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static info(...args): any {
    logger.info(Logger.getStackTrace(), ...args);
  }

  static warn(...args): any {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static warning(...args): any {
    logger.warn(Logger.getStackTrace(), ...args);
  }

  static error(...args): any {
    logger.error(Logger.getStackTrace(), ...args);
  }

  static fatal(...args): any {
    logger.fatal(Logger.getStackTrace(), ...args);
  }

  static access(...args): any {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(Logger.getStackTrace(), ...args);
  }
  static getStackTrace(deep = 2): any {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
