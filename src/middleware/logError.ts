import { Request, Response } from 'express';

export default (err: Error, req: Request, res: Response) => {
    res.status(500).send(err.message);
};
