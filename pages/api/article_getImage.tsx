import fs from 'fs'
import { NextApiRequest, NextApiResponse } from "next";

export default async function(
    req: NextApiRequest,
    res: NextApiResponse
){

    const imageBuffer = fs.readFileSync('test.jpg');
    res.setHeader('Content-Type', 'image/jpg');
    res.send( imageBuffer ); 

    return res.status(200).json({message : "ok", index : 1000})
}