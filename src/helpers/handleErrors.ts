import { Response } from "express";

export const handleError = (res: Response, error: unknown, status: number = 400) => {
  if (error && error instanceof Error) return res.status(status).send(error.message);
  return res.status(status).send(`Some error occurred`);
};
