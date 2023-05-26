import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import * as fs from 'fs';

function Slug(props) {

  function createMarkup(c) {
    return { __html: c }
  }

  const [blog, setBlog] = useState(props.myBlog);
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.container}>
          <h2 className={styles.BlogTitle}>{blog && blog.title}</h2>
          <hr />
          {blog && <p className={styles.BlogBody} dangerouslySetInnerHTML={createMarkup(blog.content)}></p>}
        </div>

      </main>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'how-to-learn-flask' } },
      { params: { slug: 'how-to-learn-javascript' } },
      { params: { slug: 'how-to-learn-nextjs' } },
    ],
    fallback: true
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;


  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8")

  return {
    props: { myBlog: JSON.parse(myBlog) },
  }
}




export default Slug;
