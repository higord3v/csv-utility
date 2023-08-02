import { Request, Response } from "express";
import { CsvController } from "./CsvController";
import db from "../config/db";

const mockRequest = (query: any, file: any = null): Request => {
    return {
        query,
        file,
    } as any;
};

const mockResponse = (): Response => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("CsvController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        db.close();
    });

    describe("upload", () => {
        it("should return 400 and error message if no file is uploaded", async () => {
            const req = mockRequest({ query: null, file: null });
            const res = mockResponse();

            const controller = new CsvController();
            await controller.upload(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                response: "Please, upload a csv file",
            });
        });
    });

    describe("indexOne", () => {
        it("should return matching customers based on query", async () => {
            const query = { q: "John" };
            const req = mockRequest(query);
            const res = mockResponse();

            const controller = new CsvController();
            await controller.indexOne(req, res);

            expect(res.json).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});
