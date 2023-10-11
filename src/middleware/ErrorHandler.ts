import { Request, Response } from 'express';

export default class ErrorHandler {
    public static handleError(err: Error, req: Request, res: Response): void {
        console.log(`Error: ${err.message}`.bgRed);
        res.status(500).send('An error has occured.');
    }

    public static notFound(req: Request, res: Response): void {
        console.log(`Error 404: Route not found ${req.method} ${req.originalUrl}`.red);
        res.status(404).end();
    }
}
