import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

function idChecker(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  if (!id) {
    res.status(400).json('Missing id parameter');
  } else if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  next();
}
export default idChecker;
