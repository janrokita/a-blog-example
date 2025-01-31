import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import md from "@/utils/markdown";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import fs from "fs";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getPost(slug: string) {
  try {
    const file = await fs.readFileSync(`./src/posts/${slug}.md`, "utf8");
    const html = md.render(file);
    const meta = (md as any).meta || {};

    return { html, meta, slug: slug };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;

  const post = await getPost(slug!);

  if (!post) {
    return {
      title: "A Blog",
    };
  }

  return {
    title: `${post.meta.title} – A Blog`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;

  const post = await getPost(slug!);

  if (!post) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col justify-center min-h-screen px-8  font-[family-name:var(--font-instrument-sans)] gap-8 max-w-3xl mx-auto">
      <Header />

      <main className="flex flex-col flex-1">
        <article className="flex flex-col gap-1">
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
            <h2 className="text-2xl font-bold font-serif">{post.meta.title}</h2>
          )}
          <p className="text-sm font-bold opacity-50">
            {dayjs(post.meta.date).format("MMMM D, YYYY")}
          </p>
          <div
            className="flex flex-col gap-4 markdown mt-4"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await fs.readdirSync(`./src/posts`);

  const slugs = posts.map((post) => {
    return {
      slug: post.replace(".md", ""),
    };
  });

  return slugs;
}
