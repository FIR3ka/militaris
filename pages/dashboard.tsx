import Link from 'next/link';
import mysql from 'mysql2/promise';
import { InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import Template from '@/app/template_editor/template';
import question from '@/app/connect_sql'

export default function Index({ result_json } : InferGetStaticPropsType<typeof getServerSideProps>){
 
    const conv  = JSON.parse(result_json);

    const [parse, parse_set] = useState(conv);

    async function DeleteItem(value : number){

      const newList = parse.filter((item : any) => item.blog_index !== value);

      parse_set(newList);

      const file = JSON.stringify([{index : value}]);

      const response = fetch("/api/article_delete", {
        method: 'POST',
        body: file,
      })

      const data = await (await response).json();
    }

     return (

        <Template>
            <div className='justify-center'>
              <div className='container mx-auto pt-[1.3em] px-[1em]'>

                { parse.map(
                  (item : any) => (

                    <div key={item.blog_index}>
                      <div className='py-[8px] px-[12px] mb-[1em] border border-gray-quill'>

                          <div className='my-[0.5em] flex'>
                            <button className='mr-[0.5em]' onClick={() => DeleteItem(item.blog_index)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#880808" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
                            </button>
                            <div className='flex'>
                              <div className='m-auto pt-[3px]'>
                                { item.blog_state == 0 ? "Bozze" : "Pubblicato"}
                              </div> 
                            </div>
                          </div>
                          
                          <Link className=''
                              href={'/editor/[id]'}
                              as={`/editor/${item.blog_index}`}>
                            <div>
                              <span className='font-semibold'>Titolo: </span>
                              <span>{ item.blog_title }</span>
                            </div>
                            <div>
                              <span className='font-semibold'>Descrizione: </span>
                              <span>{ item.blog_description }</span>
                            </div>
                            
                          </Link>
                      </div> 
                    </div>
                  )
                ) }

                </div>
            </div>
        </Template>

      )      
}

export async function getServerSideProps() {

      const results = await question("SELECT * FROM blog_table")
      const result_json = JSON.stringify(results);
      
      return {
        props: {
            result_json,
        }
    
  }
}

