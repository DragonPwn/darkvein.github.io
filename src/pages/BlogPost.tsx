import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import mermaid from "mermaid";

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
});

const MermaidChart = ({ chart }: { chart: string }) => {
    const [svg, setSvg] = useState("");
    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    useEffect(() => {
        const renderChart = async () => {
            try {
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (error) {
                console.error("Mermaid error:", error);
                setSvg(`<pre class="text-red-500">Error rendering chart</pre>`);
            }
        };
        renderChart();
    }, [chart, id]);

    return (
        <div
            className="mermaid-container my-8 p-4 bg-[#0a0a0a] border border-white/10 rounded-xl overflow-x-auto flex justify-center"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

// Helper to parse simple frontmatter without 'gray-matter'
const parseFrontmatter = (text: string) => {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return { content: text, data: {} };

    const frontmatterRaw = match[1];
    const content = match[2];
    const data: Record<string, any> = {};

    frontmatterRaw.split('\n').forEach(line => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
            let value = values.join(':').trim();
            // Handle array-like strings e.g. [tag1, tag2]
            if (value.startsWith('[') && value.endsWith(']')) {
                data[key.trim()] = value.slice(1, -1).split(',').map(s => s.trim());
            } else {
                data[key.trim()] = value;
            }
        }
    });

    return { content, data };
};

// Import all blog posts
const modules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });

const BlogPost = () => {
    const { slug } = useParams();
    const [content, setContent] = useState("");
    const [meta, setMeta] = useState<any>({});

    useEffect(() => {
        const loadContent = async () => {
            try {
                if (!slug) return;

                const availablePaths = Object.keys(modules);
                const match = availablePaths.find(path => path.toLowerCase().endsWith(`/${slug.toLowerCase()}.md`));

                if (match) {
                    const loader = modules[match];
                    const raw = await loader();
                    const { content, data } = parseFrontmatter(raw as string);
                    setContent(content);
                    setMeta(data);
                } else {
                    setContent("# 404 Not Found\nArticle does not exist.");
                    setMeta({ title: "Not Found" });
                }
            } catch (e: any) {
                console.error("Blog Loader Error:", e);
                setContent(`# Error Loading Post\n\n${e.message}`);
            }
        };
        loadContent();
    }, [slug]);

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4">
            <motion.div
                key={slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
            >
                <Link to="/blog" className="inline-flex items-center text-text-muted hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                </Link>

                <div className="mb-10 pb-6 border-b border-white/10">
                    <div className="flex flex-wrap gap-4 text-sm text-primary mb-4">
                        {meta.tags && Array.isArray(meta.tags) && meta.tags.map((tag: string) => (
                            <span key={tag} className="flex items-center bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                <Tag className="w-3 h-3 mr-1" /> {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500 leading-tight">
                        {meta.title || "Loading..."}
                    </h1>

                    <div className="flex items-center space-x-6 text-text-muted">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {meta.date}
                        </div>
                        <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {meta.author}
                        </div>
                    </div>
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
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                const isMermaid = match && match[1] === 'mermaid';

                                if (isMermaid) {
                                    return <MermaidChart chart={String(children).replace(/\n$/, '')} />;
                                }

                                return <code className={className} {...props}>{children}</code>;
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPost;
