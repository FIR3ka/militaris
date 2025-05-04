import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';

export default async function create(
    req : NextApiRequest,
    res : NextApiResponse
){
    const data = req.body;
    const data_parsed = JSON.parse(data);

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_DATABASE,
      });
    
      console.log(data_parsed[0].index)

      const [results, fields] = await connection.execute(
        "DELETE FROM blog_table where blog_index='" + data_parsed[0].index + "'"
      );
      
      return res.status(200).json([{message : "ok"}]);
}