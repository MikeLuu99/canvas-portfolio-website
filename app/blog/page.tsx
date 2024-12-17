import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Writings",
  description: "Blog, writings, and thoughts.",
};

export default function BlogPage() {
  // Get all MDX files from the blog/posts directory
  const blogDir = path.join(process.cwd(), "app/blog/posts");
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const { data: frontMatter } = matter(fileContent);

    return {
      slug: filename.replace(".mdx", ""),
      title: frontMatter.title,
      date: frontMatter.date,
    };
  });

  return (
    <div className="dark:bg-black">
      <div className="max-w-2xl mx-auto p-4 min-h-screen">
        <ThemeToggle />
        <Link
          href="/"
          className="inline-block mb-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-body"
        >
          ← Back
        </Link>
        <h1 className="text-3xl font-title mb-8 dark:text-white">Writings</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="p-4 bg-white dark:bg-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border border-black dark:border-white dark:shadow-white"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="text-xl font-title hover:underline dark:text-white"
              >
                {post.title}
              </Link>
              <p className="font-body text-gray-500 dark:text-white text-sm">
                {post.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
