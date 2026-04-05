import fs from "fs";
import type { Request, Response, NextFunction } from "express";

export function logRequest(fileName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    fs.appendFile(
      fileName,
      `${Date.now()}: ${req.ip} - ${req.method} - ${req.path}\n`,
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.log(err);
        }
        next();
      },
    );
  };
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    error: err,
  });
}
