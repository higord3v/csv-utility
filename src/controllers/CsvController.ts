import { Request, Response } from "express";
import fs from "fs";
import { parse } from "csv-parse";
import db from "../config/db";
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);

export class CsvController {
    async upload(req: Request, res: Response): Promise<Response> {
        if (!req.file) {
            return res.status(400).json({
                response: "Please, upload a csv file",
            });
        }

        //eslint-disable-next-line
        const file = req.file!;
        fs.createReadStream(file.path)
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", (row) => {
                db.serialize(() => {
                    db.run(
                        `INSERT INTO customers VALUES (?, ?, ? , ?)`,
                        [row[0], row[1], row[2], row[3]],
                        (error: Error) => {
                            if (error) {
                                res.status(400).json({
                                    response: error.message,
                                });
                            }
                        }
                    );
                });
            })
            .on("error", (error: Error) => {
                res.status(400).json({
                    response: error.message,
                });
            })
            .on("end", async () => {
                await unlinkAsync(file.path);
            });
        return res.json({
            response: "success",
        });
    }

    async indexOne(req: Request, res: Response): Promise<Response> {
        const q = req.query.q as string;
        const customers = await CsvController.findOneAsync(q);
        return res.status(200).json(customers);
    }

    static async findOneAsync(keyword: string): Promise<any> {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM customers WHERE name LIKE ?
                OR country LIKE ?
                OR city LIKE ?
                OR favorite_sport LIKE ?`,
                [
                    "%" + keyword + "%",
                    "%" + keyword + "%",
                    "%" + keyword + "%",
                    "%" + keyword + "%",
                ],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                }
            );
        });
    }
}
