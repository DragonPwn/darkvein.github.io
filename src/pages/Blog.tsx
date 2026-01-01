import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { useEffect, useState } from "react";

// Helper to parse simple frontmatter without 'gray-matter'
const parseFrontmatter = (text: string) => {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return { content: text, data: {} };

    const frontmatterRaw = match[1];
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

    return data;
};

const modules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    tags: string[];
}

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            const loadedPosts = await Promise.all(
                Object.entries(modules).map(async ([path, loader]) => {
                    const raw = await loader();
                    const data = parseFrontmatter(raw as string);
                    // Extract slug from filename: ../content/blog/my-post.md -> my-post
                    const slug = path.split('/').pop()?.replace('.md', '') || '';
                    return { ...data, slug } as BlogPost;
                })
            );

            // Sort by date descending
            loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setPosts(loadedPosts);
        };
        loadPosts();
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="inline-block p-2 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
                    Engineering & Updates
                </div>
                <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    The DarkVein Blog
                </h1>
                <p className="text-xl text-text-muted max-w-2xl">
                    Deep dives into C2 development, evasion techniques, and framework updates.
                </p>
            </motion.div>

            <div className="space-y-8">
                {posts.map((post, i) => (
                    <motion.article
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ArrowRight className="w-24 h-24 -mr-8 -mt-8 text-primary" />
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4 relative z-10">
                            <div className="flex items-center text-primary/80">
                                <Calendar className="w-4 h-4 mr-2" />
                                {post.date}
                            </div>
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {post.author}
                            </div>
                        </div>

                        <Link to={`/blog/${post.slug}`} className="relative z-10 block">
                            <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                {post.title}
                            </h2>
                        </Link>

                        <p className="text-text-muted mb-6 leading-relaxed max-w-2xl relative z-10 text-lg">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
                            <div className="flex flex-wrap gap-2">
                                {post.tags && Array.isArray(post.tags) && post.tags.map((tag: string) => (
                                    <span key={tag} className="flex items-center px-3 py-1 bg-white/5 rounded-full text-xs text-text-muted border border-white/10 group-hover:border-primary/20 transition-colors">
                                        <Tag className="w-3 h-3 mr-1" /> {tag}
                                    </span>
                                ))}
                            </div>
                            <Link to={`/blog/${post.slug}`} className="flex items-center text-white font-medium hover:text-primary transition-colors group-hover:translate-x-1 duration-300">
                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    </motion.article>
                ))}

                {posts.length === 0 && (
                    <div className="text-center py-20 text-text-muted">
                        Loading articles...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
