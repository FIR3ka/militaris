import { neon } from "@neondatabase/serverless";

export default async function connection(question : string){

    const sql = neon(`postgres://neondb_owner:npg_kN3JuQV5pDtq@ep-summer-sound-a25a938d-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`);

    const results = await sql.query(question);

    return results;

}