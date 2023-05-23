import express, { Request, Response } from "express";
import { getLogger } from "@/utils/loggers";
const router = express.Router();
const logger = getLogger("INDEX_ROUTE");
import { sp } from "../../Auth/Auth";
// const {connectToDB, getDB} =require("../../MongoDB/database")
import {
  getPlaceMongodb,
  addUserData,
  getAllData,
  getSingleUser,
  updateUser,
  deleteUser,
  adddocument,
  addImage,
  getDocument,
} from "../person/controller";

//adding user
router.post("/addUserData", addUserData);
//gettting all the person
router.get("/getAllData", getAllData);
//getting details of user
router.get("/getSingleUser/:id", getSingleUser);
//updating person details
router.put("/:id", updateUser);

//deleting person details
router.delete("/:id", deleteUser);

//adding document
router.post("/adddocument/:id", adddocument);

//adding image
router.post("/addImage/:id", addImage);

//getting document
router.get("/getDocument/:id", getDocument);

//downloading document
router.get("/downloadfile");
//getting data from mongodb
router.get("/getPlaceMongodb", getPlaceMongodb);
export default router;
