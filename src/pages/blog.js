import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import * as fs from 'fs';

function Blog(props) {

  const [blogs, setBlogs] = useState(props.allBlogs)

  // useEffect (() => {
    
  // }, [])

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.containerBlogs}>
          <h1 className={styles.PopularBlog}>Blogs</h1>

          {blogs.map((blogitems) => {
            return <div className={styles.container} key={blogitems.slug}>
            <Link href={`/blogpost/${blogitems.slug}`}>
            <h2 className={styles.BlogTitle}>{blogitems.title}</h2></Link>
            <p className={styles.BlogBody}>{blogitems.metadesc.substr(0, 140)}...</p>
          </div>
          })}

        </div>


      </main>
    </div>
  )
};

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata")
  let myfile;
  let allBlogs = [];

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(("blogdata/" + item), "utf-8")
    allBlogs.push(JSON.parse(myfile))
  }
  
  
  return { 
    props: { allBlogs },
  }
}

export default Blog;
