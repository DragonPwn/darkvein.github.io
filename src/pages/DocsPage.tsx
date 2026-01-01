import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
// Helper to parse simple frontmatter without 'gray-matter' (which requires Buffer polyfill)
const parseFrontmatter = (text: string) => {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return { content: text, data: {} };

    const frontmatterRaw = match[1];
    const content = match[2];
    const data: Record<string, string> = {};

    frontmatterRaw.split('\n').forEach(line => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
            data[key.trim()] = values.join(':').trim();
        }
    });

    return { content, data };
};

// In Vite, effective dynamic imports for MD usually require a glob
const modules = import.meta.glob('../content/docs/*.md', { query: '?raw', import: 'default' });

const DocsPage = () => {
    const { slug } = useParams();
    const [content, setContent] = useState("");
    const [meta, setMeta] = useState<any>({});

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Default to intro if no slug
                const docSlug = slug || "intro";

                const availablePaths = Object.keys(modules);

                // Robust matching: Find key that ends with the requested slug file
                const match = availablePaths.find(path => path.toLowerCase().endsWith(`/${docSlug.toLowerCase()}.md`));

                if (match) {
                    const loader = modules[match];
                    const raw = await loader();
                    // Use manual parser instead of gray-matter
                    const { content, data } = parseFrontmatter(raw as string);
                    setContent(content);
                    setMeta(data);
                } else {
                    setContent("# 404 Not Found\nDocument does not exist.");
                    setMeta({ title: "Not Found" });
                }
            } catch (e: any) {
                console.error("Docs Loader Error:", e);
                setContent(`# Error Loading Doc\n\n${e.message}`);
                setMeta({ title: "Error" });
            }
        };
        loadContent();
    }, [slug]);

    return (
        <motion.div
            key={slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
        >
            <div className="mb-10 pb-6 border-b border-white/10">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    {meta.title || "Documentation"}
                </h1>
            </div>

            <div className="prose prose-invert prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-white
                prose-h1:text-4xl prose-h1:mb-6
                prose-h2:text-2xl prose-h2:text-primary prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:text-white/90 prose-h3:mt-8
                prose-p:text-text-muted prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:list-disc prose-ul:pl-6 prose-li:text-text-muted
                prose-code:text-primary/90 prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-6 prose-pre:shadow-2xl
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-secondary/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                prose-table:w-full prose-table:text-left prose-table:border-collapse
                prose-th:p-4 prose-th:text-white prose-th:bg-secondary/20 prose-th:font-semibold prose-th:border-b prose-th:border-white/10
                prose-td:p-4 prose-td:border-b prose-td:border-white/5 prose-td:text-text-muted
                ">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
};

export default DocsPage;
