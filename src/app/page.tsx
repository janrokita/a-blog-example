"use server";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import md from "@/utils/markdown";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import fs from "fs";
import Link from "next/link";

async function getPosts() {
  try {
    const posts = await fs.readdirSync(`./src/posts`);

    let postData: any[] = [];

    for await (const post of posts) {
      const file = await fs.readFileSync(`./src/posts/${post}`, "utf8");
      const html = md.render(file);
      const meta = (md as any).meta || {};

      postData.push({ html, meta, slug: post.replace(".md", "") });
    }

    return postData.sort((a, b) => b.date - a.date);
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col justify-center min-h-screen px-8  font-[family-name:var(--font-instrument-sans)] gap-8 max-w-3xl mx-auto">
      <Header />

      <main className="flex flex-col gap-8 items-center flex-1">
        {posts && posts.length > 0 ? (
          <>
            {posts.map((post, index) => (
              <article
                key={index}
                className="flex flex-col gap-1 border-b  border-neutral-200 dark:border-b-neutral-800"
              >
                {post.meta.linked ? (
                  <Link
                    href={post.meta.linked}
                    className="hover:underline w-fit flex flex-row gap-[1ch] items-center"
                    target="_blank"
                  >
                    <h2 className="text-2xl font-bold font-serif">
                      {post.meta.title}
                    </h2>
                    <ArrowSquareOut size={18} weight="bold" className="mb-1" />
                  </Link>
                ) : (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline w-fit"
                  >
                    <h2 className="text-2xl font-bold font-serif">
                      {post.meta.title}
                    </h2>
                  </Link>
                )}

                <p className="text-sm font-bold opacity-50">
                  {dayjs(post.meta.date).format("MMMM D, YYYY")}
                </p>
                <div
                  className="flex flex-col gap-4 markdown mt-4"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-bold opacity-50 pb-4 hover:underline"
                >
                  Click here to view the full post.
                </Link>
              </article>
            ))}
          </>
        ) : (
          <div className="flex-1 items-center justify-center flex">
            <p className="font-serif text-2xl">Nothing has been posted yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
