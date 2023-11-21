import { Response } from "express";
import chalk from "chalk";

export const handleError = (res: Response, error: any,status: number = 400) => {
    if (error && error instanceof Error) return res.status(status).send(error.message)
    return res.status(status).send(`Some error occurred`)
}