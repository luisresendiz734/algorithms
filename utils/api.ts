import fs from "fs"
import path from "path"
import matter from "gray-matter"
import remark from "remark"
import remarkHtml from "remark-html"
import remarkPrism from "remark-prism";

export const getPostSlugs = () => {
    const files = fs.readdirSync("_posts");
    const slugs = files.map(filename => filename.replace(".md", ""));

    return slugs;
}

export const getPostBySlug = async (slug: string) => {
    const file = fs.readFileSync(path.join("_posts", `${slug}.md`)).toString();
    const { content, data } = matter(file);
    const { contents } = await remark().use(remarkPrism).use(remarkHtml).process(content);
    return {
        data,
        contents
    }
}

export const getPosts = async (fields: string[]) => {
    const slugs = getPostSlugs();
    const promisses = slugs.map(slug => getPost(slug, fields));

    const result = await Promise.allSettled(promisses);
    const posts = result.map(res => {
        if(res.status == "fulfilled") {
            return res.value
        }
    });
    
    return posts;
}


export const getPost = async (slug: string, fields: string[]) => {
    const { data, contents } = await getPostBySlug(slug);
    const post = {};

    fields.forEach(field => {
        if(field === "slug") {
            post["slug"] = slug;
        } else if(field === "html") {
            post["html"] = contents;
        } else if(data[field]) {
            post[field] = data[field];
        }
    });

    return post;
}