import {NextApiRequest, NextApiResponse} from "next";
import formidable from "formidable";
import { Writable } from "stream";
import mysql from 'mysql2/promise';

export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function Home(
    req: NextApiRequest, res : NextApiResponse
) {
    const fs = require('fs');

    let files: any[] = [] ;

    let fi;

    const fileConsumer = (file : any) => {

        const chunks =  new Array;
        const writable = new Writable({
          write(chunk, _, cb) {
            chunks.push(chunk);
            cb();
          },
          final(cb) {
            const buffer = Buffer.concat(chunks);
            files.push(buffer);
            fi = buffer;
            cb();
  
          },

        });

        return writable;
    };
    
    var inputFields = {};

    const data: { files: any } = await new Promise((resolve, reject) => {
        const form = formidable({
            multiples: true,
            fileWriteStreamHandler: fileConsumer
        });     

        form.parse(req, (err: any, fields: any, files: any) => {
            if (err) reject({err});
            resolve({files});
            inputFields = fields;
        });
    });

    const searchParams = new URLSearchParams(inputFields);

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
    });
    
    const title = searchParams.get("title") as string;
    const description = searchParams.get("description") as string;
    const index = searchParams.get("index") as string

    const data_title_secure = title.replace("'","''");
    const data_description_secure = description.replace("'","''");

    const [results, fields] = await connection.execute(
        "UPDATE blog_table SET blog_title = '" + data_title_secure + "', blog_description= '" + data_description_secure + "' WHERE blog_index = " + index + ";"
    );

    const fileName = "public/post_thumbnail/" + index + ".jpg";
    const fileName_2 = "public/post_text/" + index + ".html";

    if(fi != undefined){
        fs.writeFile(fileName, files[0], (err: any)  =>{null});
    }

    fs.writeFile(fileName_2, searchParams.get("Editor_body") as string, (err: any)  =>{null});

    return res.status(200).json({ message : "ok"})
}