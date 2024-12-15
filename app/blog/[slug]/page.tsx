import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

// Define custom components with proper font styling
const components = {
  Image: (props: any) => (
    <Image
      {...props}
      loading="lazy"
      style={{ maxWidth: "100%", height: "auto" }}
      alt={props.alt || "Blog post image"}
    />
  ),
  a: (props: any) => (
    <Link
      {...props}
      href={props.href}
      className="text-blue-600 hover:text-blue-800 font-body"
    >
      {props.children}
    </Link>
  ),
  // Add specific styling for lists with proper font
  ul: (props: any) => (
    <ul
      className="list-disc list-outside ml-6 my-4 space-y-2 font-body"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="list-decimal list-outside ml-6 my-4 space-y-2 font-body"
      {...props}
    />
  ),
  // Style list items with proper font
  li: (props: any) => (
    <li
      className="pl-2 marker:text-gray-500 font-body text-base leading-relaxed"
      {...props}
    />
  ),
  // Add font styling for paragraphs
  p: (props: any) => (
    <p className="font-body text-base leading-relaxed my-4" {...props} />
  ),
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const filePath = path.join(
      process.cwd(),
      "app/blog/posts",
      `${params.slug}.mdx`,
    );

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
        <div className="prose prose-lg max-w-none prose-ul:my-6 prose-ol:my-6 prose-li:my-0 prose-headings:my-6 prose-headings:font-title prose-p:font-body prose-li:font-body">
          <MDXRemote
            source={content}
            components={components}
            options={{
              parseFrontmatter: true,
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
                format: "mdx",
              },
            }}
          />
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}
