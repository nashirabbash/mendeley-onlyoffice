//Structured JSON Logger Service for Observability

export const LogLevel = {
    DEBUG: "DEBUG",
    INFO: "INFO",
    WARN: "WARN",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
};

class LoggerService {
    constructor(context = "MendeleyPlugin") {
        this.context = context;
    }

    _log(level, event, data = {}) {
        const payload = {
            timestamp: new Date().toISOString(),
            context: this.context,
            level: level,
            event: event,
            details: data
        };
        const jsonStr = JSON.stringify(payload);
        switch (level) {
            case LogLevel.ERROR:
                console.error(jsonStr);
                break;
            case LogLevel.WARN:
                console.warn(jsonStr);
                break;
            case LogLevel.DEBUG:
                console.debug(jsonStr);
                break;
            default:
                console.log(jsonStr);
                break;
        }
        return payload;
    }

    debug(event, data) {
        return this._log(LogLevel.DEBUG, event, data);
    }

    info(event, data) {
        return this._log(LogLevel.INFO, event, data);
    }

    warn(event, data) {
        return this._log(LogLevel.WARN, event, data);
    }

    error(event, data) {
        return this._log(LogLevel.ERROR, event, data);
    }

    success(event, data) {
        return this._log(LogLevel.SUCCESS, event, data);
    }
}

export const logger = new LoggerService();
export { LoggerService };
