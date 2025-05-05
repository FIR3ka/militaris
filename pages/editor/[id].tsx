import { useRouter } from 'next/router';
import React, { useState } from 'react';
import mysql from 'mysql2/promise';
import { InferGetStaticPropsType } from 'next';
import Template from '@/app/template_editor/template';
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { ImageUploadButton } from '@/components/tiptap-ui/image-upload-button'
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node'
import { handleImageUpload, MAX_FILE_SIZE } from '@/app/lib/tiptap-utils'
import { promises as fs } from 'fs'

import '@/app/styles.scss'

import MenuBar from '../MenuBar';


export async function getServerSideProps({ params }: { params: any }) {

    const filename = "public/post_text/" + params.id + ".html";
    const filecontents = await fs.readFile(filename, 'utf-8');

    const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
          });

          const [results, fields] = await connection.execute(
            "SELECT * FROM blog_table where blog_index=" + params.id
          );

    connection.end();

    const repo_data = JSON.stringify(results);
    return { props: { 
            repo : repo_data,
            content_ : filecontents,
        } 
    }
}

const extensions = [
 /* Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),*/

  Image,
  ImageUploadNode.configure({
    accept: 'image/*',
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => console.error('Upload failed:', error),
  }),
  BulletList,
    ListItem,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    
    
  }),
]


export default function Cloud( { repo, content_} : InferGetStaticPropsType<typeof getServerSideProps> ){

  const [val, setVal] = useState(content_.toString());

   function up({ editor } : any){
    const html = editor.getHTML();
    setVal(html);
  }

    const parsed = JSON.parse(repo);
    const router = useRouter();
    const [input_title, setTitle] = useState(parsed[0].blog_title);
    const [input_description, setDescription] = useState(parsed[0].blog_description);
    const [img, setImg] = useState<File>();
    const [button, setButton] = useState(parsed[0].blog_state)
    const [button_value, setButton_value] = useState(button == 0 ? "Bozze" : "Pubblicato")

    async function setData(){
        
        const Editor_body = Buffer.from( val as string );
        const someFormData = new FormData();

        someFormData.append("Editor_body" , Editor_body as unknown as File);

        if(img != undefined){
            someFormData.append("Post_thumbnail" , img as File);
            
        }
        someFormData.append("index", router.query.id as string)
        someFormData.append("title", input_title as string)
        someFormData.append("description", input_description as string)
        
        const response = await fetch('/api/article_update', {
            method: 'POST',
            body: someFormData
        });

    }

    async function setPublic(){

        if(button == 0){
            setButton(1);
            setButton_value("Pubblicato")
        }
        else{
            setButton(0);
            setButton_value("Bozze")
        } 
        
        const formData = {
            index: parsed[0].blog_index,
            state: button == 0 ? 1 : 0,
        } ;
        

        const file = JSON.stringify(formData)

        const response = await fetch('/api/article_setState', {
            method: 'POST',
            body: file,
        })

        const data = await response.json()
            
    }

    const content = content_.toString();

    return (

        <Template>

            <div>

            <div className="flex mt-[2em]">

                <div>
                    <p>results: </p>
                    <div>
                        {parsed.map( (item : any, index : number) => (<div key={index}>{ item.blog_index }</div>))}
                    </div>
                </div>

                <div className="w-[800px] mx-auto">
                    <div className="">
                        <div>
                            <button onClick={setData} className="salva mr-[1em]">Salva</button>
                            <button  onClick={setPublic} className="salva">{ button_value }</button>
                        </div>

                        <div className="mt-[var(--editor-padding)] border border-gray-quill">
                            <p className="p-[8px]">Titolo</p>
                            <input defaultValue={parsed[0].blog_title} onChange={(e) => setTitle(e.target.value)} className="w-full p-[8px]" type="text" />
                        </div>

                        <div className="mt-[var(--editor-padding)] border border-gray-quill">
                            <p className="p-[8px]">Descrizione</p>
                            <input defaultValue={parsed[0].blog_description} onChange={(e) => setDescription(e.target.value)} className="w-full p-[8px]" type="text" />
                        </div>

                        <div className="mt-[var(--editor-padding)] border border-gray-quill">
                            <p className="p-[8px]">Immagine</p>
                            <input type="file" onChange={(e)  => setImg(e.target.files?.[0])} className="p-[8px]"/>
                        </div>
                    </div>

                    <div className="mt-[var(--editor-padding)]">
                        <EditorProvider slotBefore={<MenuBar />}   immediatelyRender={false} onUpdate={up} extensions={extensions} content={content}></EditorProvider>
                    </div>
                </div>
            </div>
        </div>
            
        </Template>



    )
    
}
