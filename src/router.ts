import { Router } from "express";
import { CsvController } from "./controllers/CsvController";
import multer from "multer";
const upload = multer({ dest: "temp/" });
const controller = new CsvController();
const router = Router();

router.post("/files", upload.single("file"), controller.upload);
router.get("/users", upload.single("file"), controller.indexOne);

export { router };
