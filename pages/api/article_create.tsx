import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';
import { promises as fs } from 'fs'

export default async function create(
    req : NextApiRequest,
    res : NextApiResponse
){
    const connection = await mysql.createConnection({
        multipleStatements: true,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
      });
    
      const [results, fields] = await connection.query(
        'INSERT INTO blog_table VALUES (NULL, 0, " ", " ");'
      );
    
      const parse = JSON.parse(JSON.stringify(results));

      const filename = "public/post_text/" + parse.insertId + ".html";
      await fs.writeFile(filename, "")

      return res.status(200).json([{message : "ok"}, {index : parse.insertId}]);
}