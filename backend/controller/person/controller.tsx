import express, { Request, Response } from "express";
import { IItemAddResult} from "@pnp/sp-commonjs";
import { sp } from "../../Auth/Auth";
import { UploadedFile } from "express-fileupload";
import getContentType from "../../utils/getContentType";
const {connectToDB, getDB} =require("../../MongoDB/database")


export const addUserData=async (req: any, res: Response) => {
  
    try {
      let firstname = req.body.firstname;
      let lastname = req.body.lastname;
      let dateofbirth = req.body.dateofbirth;
      let gender = req.body.gender;
      let district = req.body.district;
      let pincode = req.body.pincode;
      let number = req.body.number;
      let email = req.body.email;
  
      let addItems: IItemAddResult = await sp.web.lists
        .getByTitle("persons")
        .items.add({
          Title: "persons",
          firstname: firstname,
          lastname: lastname,
          dateofbirth: dateofbirth,
          gender: gender,
          district: district,
          pincode: pincode,
          number: number,
          email: email,
        });
      await sp.web
        .getFolderByServerRelativePath("personslibrary")
        .addSubFolderUsingPath(`${addItems.data.Id}`);
      res.send(addItems);
    } catch (error) {
      res.send(error);
    }
  } 
export const getAllData=async (req: Request, res: Response) => {
    try {
      let getAllData = await sp.web.lists.getByTitle("persons").items();
      res.send(getAllData);
    } catch (error) {
      console.log(error);
    }
  }  
export const getSingleUser=async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      let SingleUser = await sp.web.lists
        .getByTitle("persons")
        .items.getById(+id)();
      res.send(SingleUser);
    } catch (error) {
      res.send(error);
    }
  }  
export const updateUser=async (req: Request, res: Response) => {
    try {
      console.log(req.body);
  
      const id = req.params.id;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const dateofbirth = req.body.dateofbirth;
      const gender = req.body.gender;
      const district = req.body.district;
      const pincode = req.body.pincode;
      const number = req.body.number;
      const email = req.body.email;
  
      const list = sp.web.lists.getByTitle("persons");
      const item = await list.items.getById(+id).update({
        Title: "persons",
        firstname: firstname,
        lastname: lastname,
        dateofbirth: dateofbirth,
        gender: gender,
        district: district,
        pincode: pincode,
        number: number,
        email: email,
      });
  
      if (req.files && req.files.image) {
        const imageFile = req.files.image as UploadedFile;
        imageFile.mv(
          `${__dirname}/public/images/${req.body.filename}.jpg`,
          (err: any) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.json({ file: `public/${req.body.filename}.jpg` });
            console.log(res.json);
          }
        );
        console.log(imageFile + "hello");
      } else {
        res.send("No file uploaded");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
export const deleteUser=async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      const list = sp.web.lists.getByTitle("persons");
      await list.items.getById(+id).delete();
      console.log("deleted");
      const personsLibrary = await sp.web.lists.getByTitle("personslibrary");
      const folder = await personsLibrary.rootFolder.folders.getByName(id);
      await folder.delete();
      console.log("folder deleted");
      
      res.sendStatus(200); 
    } catch (error) {
      console.error("Error deleting data:", error);
      res.status(500).send("An error occurred while deleting data."); 
    }
  }  
export const adddocument=async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      const file: any = req.files;
      const files = file.file;
      let fileNamePath = files.name;
  
      files.mv(`${__dirname}../../../public/images/${files.name}`);
      res.send("File(s) uploaded successfully");
      await sp.web
        .getFolderByServerRelativePath(`personslibrary/${id}`)
        .files.addUsingPath(fileNamePath, files, { Overwrite: true });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("Error uploading file");
    }
  }  
export const addImage=async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      const image: any = req.files;
      const fileNamePath = image.image.name;
  
      image.image.mv(`${__dirname}../../../public/images/${fileNamePath}`);
  
      const list = await sp.web.lists.getByTitle("persons");
      const fileDetails = await sp.web
        .getFolderByServerRelativePath(`personslibrary/${id}`)
        .files.addUsingPath(fileNamePath, image.image.data, { Overwrite: true });
      console.log(fileDetails);
  
      console.log("file submitted..");
      await list.items.getById(+id).update({
        imageurl: fileDetails.data.ServerRelativeUrl,
      });
  
      res.send("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).send("An error occurred while uploading the file."); 
    }
  }  
export const getDocument=async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const folderPath = `personslibrary/${id}`;
      const folder = sp.web.getFolderByServerRelativePath(folderPath);
      const files = await folder.files();
      res.send(files);
    } catch (error) {
      console.error("Error retrieving documents:", error);
      res.status(500).send("An error occurred while retrieving documents."); 
    }
  }
export const downloadfile=async (req: Request, res: Response) => {
    try {
      const serverRelativePath = req.query.serverRelativePath as string;
      const file = sp.web.getFileByServerRelativePath(serverRelativePath);
      const buffer: ArrayBuffer = await file.getBuffer();
      const fileName = serverRelativePath.split("/").pop() || "";
      const contentType = getContentType(fileName);
      res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-type", contentType);
      res.status(200).send(Buffer.from(buffer));
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).send("An error occurred while downloading the file."); 
    }
  }  
export const getPlaceMongodb = async (req: Request, res: Response) => {
  
        connectToDB()
          .then(() => {
            const db = getDB();
            const places = db.collection('places');
      
            places.find().toArray()
              .then((data: any) => {
                res.json(data);
                // console.log(data);
                
              })
              .catch((error: any) => {
                console.error('Error retrieving data from "places" collection:', error);
                res.status(500).json({ error: 'An error occurred while retrieving data.' });
              });
          })
          .catch((err: any) => {
            console.error('Error connecting to MongoDB Atlas:', err);
            res.status(500).json({ error: 'An error occurred while connecting to the database.' });
          });
      }
