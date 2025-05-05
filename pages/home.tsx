import React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { InferGetStaticPropsType } from "next"
import Template from '@/app/template_blog/template';
import question from '@/app/connect_sql'

export default function Home({ result_json } : InferGetStaticPropsType<typeof getServerSideProps>){

  const final_result = JSON.parse(result_json);

  return (  
    <Template>
      <div className='items-center lg:pt-[8em] pt-[3em] bg-stone-50'>
        <div className='container grid-cols-1 lg:grid grid-cols-3 mx-auto lg:gap-[3em] min-h-screen px-[1.1em] lg:px-[var(--standard)]'>
            
            {
              final_result.map((item : any) => {
                return (
                  <div> 

                    <Link href={"articles/" + item.blog_index}>
                      <div className="text-lg mt-[1em]">{ item.blog_title }</div>
                      <div className="text-stone-800">{ item.blog_description }</div>
                    </Link>

                  </div>
                )
              })
            }
        </div>
      </div>
    </Template>
  )

}

export async function getServerSideProps() {


  const result = await question("SELECT * FROM blog_table WHERE blog_state = array[1]");

  const result_json = JSON.stringify(result);
  console.log(result_json);
        
  return {
    props: {
      result_json
    }
  };

}