import { Request, Response } from 'express';
import TestModel from '../model/TestModel';

export default class TestController {
    public static test(req: Request, res: Response): void {
        res.json(TestModel.test()).status(200);
    }
}
