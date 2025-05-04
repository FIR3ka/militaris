import Template from "@/app/template_blog/template"
import { InferGetStaticPropsType } from "next";
import { promises as fs } from 'fs'

"use server"

export default function Article( {content} : InferGetStaticPropsType<typeof getStaticProps>){

    return (
        <Template>
            <div className="w-[900px] mx-auto mt-[3em]"> 
                {
                   <div
                   dangerouslySetInnerHTML={{__html: content}}
                 />
                }
            </div>
        </Template>
    )

}

export const getStaticPaths = (async () => {

    return {
        paths: [],
        fallback: "blocking" 
    }

})

export async function getStaticProps({ params }: { params: any }){

    const filename = "public/post_text/" + params.id + ".html";
    const fileContents = await fs.readFile(filename, "utf-8")

    return {
            props: {
                content: fileContents
            }
        }

}