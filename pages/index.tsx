import { GetStaticProps } from "next"
import Link from "next/link"
import Head from "next/head"
import { getPosts } from "../utils/api"
import React from "react"
import { format } from "date-fns"

type Post = { title: string, slug: string, date: string }


const Home: React.FC<{ paths: string }> = ({ paths }) => {

    const posts: Post[] = JSON.parse(paths);
    
    return (
        <React.Fragment>
            <Head>
                <title>Panda algorithms</title>
            </Head>
            <header>
                <h1 style={{ textAlign: "center", marginBottom: "-2rem" }}>🐼</h1>
                <h1 style={{ textAlign: "center" }}>algorithms</h1>
            </header>
            <hr/>
            <main>
                <h1></h1>
                <ul>
                    {posts.map(({ title, slug, date }) => (
                        <li key={slug}>
                            <Link href={`/${slug}`}>
                                <p style={{ display: "flex", alignItems: "center" }}>
                                    <a style={{ flexGrow: 1}}>{title}</a>
                                    <small>{format(new Date(date), "PPPP")}</small>
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const paths = JSON.stringify(await getPosts(["title", "slug", "date"]));
    
    return {
        props: {
            paths
        }
    }
}

export default Home