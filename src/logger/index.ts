import { createLogger, format, transports } from 'winston';

export default createLogger({
    format: format.combine(
        format.json(),
        format.prettyPrint()
    ),
    transports: [
        new transports.Console()
    ]
});
