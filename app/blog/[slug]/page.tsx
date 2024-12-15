import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const filePath = path.join(process.cwd(), "app/blog/posts", `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontMatter, content } = matter(fileContent);

  return (
    <article className="max-w-2xl mx-auto p-4">
      <Link
        href="/blog"
        className="inline-block mb-4 text-gray-500 hover:text-gray-700 font-body"
      >
        ← Back
      </Link>
      <header className="mb-8">
        <h1 className="text-3xl font-normal font-title mb-2">
          {frontMatter.title}
        </h1>
        <time className="text-gray-500 font-body">{frontMatter.date}</time>
      </header>
      <div className="prose prose-lg">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
