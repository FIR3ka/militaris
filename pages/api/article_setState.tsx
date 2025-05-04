'use server'

import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const data = req.body;
  const data_parsed = JSON.parse(data);

  console.log(data_parsed.state);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
  });

  const [results, fields] = await connection.execute(
    "UPDATE blog_table SET blog_state ='" + data_parsed.state + "' WHERE blog_index ='" + data_parsed.index +"'"
  );

  connection.end();

  return res.status(200).json([{message : "ok"}]);
  
}

