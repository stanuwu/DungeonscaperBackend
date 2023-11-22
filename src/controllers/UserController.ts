import { Request, Response } from 'express';
import UserModel from '../model/UserModel';
import ApiSession from '../api/ApiSession';

export default class UserController {
    public static getUser(req: Request, res: Response): void {
        res.json(UserModel.makeOrGetUser(req.body.name, req.ip)).status(200);
    }

    public static createSession(req: Request, res: Response): void {
        const session: ApiSession | undefined = UserModel.makeSession(
            req.body.name,
            req.body.description,
            req.body.owner,
        );
        if (!session) {
            res.status(400).send('Invalid Owner');
        } else {
            res.json(session).status(200);
        }
    }
}
