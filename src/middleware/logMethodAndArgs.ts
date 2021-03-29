import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export default (req: Request, res: Response, next: NextFunction) => {
    const logMessage = {
        'url': req.url,
        'method': req.method,
        'body': req.body,
        'query': req.query
    };
    logger.info(logMessage);
    next();
};
