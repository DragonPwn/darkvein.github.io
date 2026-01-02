import { motion } from "framer-motion";
import { ArrowRight, Shield, Terminal as TerminalIcon, Share2, Network, Code2, MessageSquare, FileCode, Terminal, Cpu, Globe, Play, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import CyberBackground from "../components/CyberBackground";
import SpotlightCard from "../components/SpotlightCard";
import { useEffect, useState } from "react";
import newLogo from "../assets/newlogo.png";
import dashboardPreview from "../assets/dashboard_preview.png";
import chatPreview from "../assets/chat_preview.png";
import terminalPreview from "../assets/terminal_preview.png";
import teamServer from "../assets/team_server.png";
import comicsPreview from "../assets/comics_preview.png";



// --- Helpers ---
const parseFrontmatter = (text: string) => {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return { content: text, data: {} };
    const frontmatterRaw = match[1];
    const data: Record<string, any> = {};
    frontmatterRaw.split('\n').forEach(line => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
            let value = values.join(':').trim();
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

// --- Components ---



const FeatureVisual = ({ type }: { type: string }) => {
    if (type === 'stealth') {
        return (
            <div className="mt-auto pt-6 opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#111] p-3 rounded-lg font-mono text-xs border border-white/10">
                    <div className="text-purple-400">mov r10, rcx</div>
                    <div className="text-purple-400">mov eax, [ssn]</div>
                    <div className="text-yellow-300">syscall</div>
                    <div className="text-green-400">ret</div>
                </div>
            </div>
        )
    }
    if (type === 'graph') {
        return (
            <div className="mt-auto pt-6 flex justify-center py-4 relative h-32 opacity-60 group-hover:opacity-100 transition-opacity">
                {/* Pivot Chain Sim */}
                <div className="absolute top-1/2 left-4 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] z-10" />
                <div className="absolute top-1/2 left-4 w-full h-0.5 bg-white/20" />
                <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-purple-500 rounded-full z-10 animate-pulse" />
                <div className="absolute top-1/2 right-4 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] z-10" />
            </div>
        )
    }
    return null;
}

const Home = () => {
    const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            const loadedPosts = await Promise.all(
                Object.entries(modules).map(async ([path, loader]) => {
                    const raw = await loader();
                    const data = parseFrontmatter(raw as string);
                    const slug = path.split('/').pop()?.replace('.md', '') || '';
                    return { ...data, slug } as BlogPost;
                })
            );
            loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setLatestPosts(loadedPosts.slice(0, 3));
        };
        loadPosts();
    }, []);

    return (
        <div className="relative min-h-screen bg-background text-white selection:bg-primary/20">
            <CyberBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            v0.2 Native Release
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                            CONTROL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary/50 animate-pulse">EVERYTHING.</span>
                        </h1>

                        <p className="text-xl text-text-muted mb-8 max-w-xl leading-relaxed font-light">
                            Advanced Red Teaming Framework. <br />
                            <span className="text-white font-medium">Syscalls</span>. <span className="text-white font-medium">Memory Evasion</span>. <span className="text-white font-medium">Pivot Chains</span>.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/pricing"
                                className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center group"
                            >
                                Request Pricing
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/docs"
                                className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all flex items-center backdrop-blur-sm"
                            >
                                <TerminalIcon className="mr-2 w-5 h-5" />
                                Documentation
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Content - Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, rotateY: -10 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center lg:justify-end perspective-1000"
                    >
                        <div className="relative group">


                            {/* Image Container - Frameless */}
                            <div className="relative transform transition-transform duration-500 hover:scale-[1.02]">
                                <img
                                    src={newLogo}
                                    alt="DarkVein Logo"
                                    className="w-full max-w-lg object-cover drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>




            {/* Release 0.2 Section */}
            <section className="py-24 px-4 max-w-7xl mx-auto border-b border-white/5">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                            Release 0.2: Visual Command. <span className="text-primary">Deep Access.</span>
                        </h2>
                        <p className="text-xl text-text-muted mb-8 leading-relaxed font-light">
                            The latest update introduces a complete visual overhaul of the <strong className="text-white">Mission Control Dashboard</strong>, designed for streamlined operations.
                            Plus, new <strong className="text-white">SMB Named Pipe Pivoting</strong> capabilities allow you to traverse restricted networks and chain agents with ease.
                        </p>

                    </div>
                    <div className="flex-1 w-full">
                        <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden group aspect-video shadow-2xl">
                            {/* Video Thumbnail / Placeholder */}
                            <img
                                src={dashboardPreview}
                                alt="Release 0.2 Demo"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-transform cursor-pointer">
                                    <div className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(36,237,141,0.4)]">
                                        <Play className="w-6 h-6 ml-1 fill-current" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section 1: Toxin Agent */}
            <section className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
                <div className="mb-10">
                    <div className="inline-block p-2 px-3 rounded text-xs font-mono bg-primary/10 text-primary border border-primary/20 mb-3">
                        COMPONENT: AGENT
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Toxin Agent</h2>
                    <p className="text-text-muted text-lg max-w-2xl">
                        A lightweight, native C++ beacon designed for silence.
                        Operates entirely in-memory with no unmanaged dependencies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px]">
                    {/* Feature 1: Stealth (Large) */}
                    <SpotlightCard className="md:col-span-4 md:row-span-1 group">
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><Shield className="w-6 h-6" /></div>
                                    <h3 className="text-2xl font-bold mb-2">Evasion Engine</h3>
                                    <p className="text-text-muted max-w-md">By-pass EDRs with configurable technique selection. Choose between Direct Syscalls, Indirect Syscalls (Trampoline), or Native APIs.</p>
                                </div>
                                <FeatureVisual type="stealth" />
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                    </SpotlightCard>

                    {/* Feature 3: BOF (Mid) */}
                    <SpotlightCard className="md:col-span-2 md:row-span-1 group">
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><Code2 className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-2">BOF Support</h3>
                            <p className="text-text-muted text-sm">Execute COFF object files in memory without dropping artifacts to disk.</p>
                        </div>
                    </SpotlightCard>

                    {/* Feature 4: Inline Execution (Mid) */}
                    <SpotlightCard className="md:col-span-2 md:row-span-1 group">
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><Cpu className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-2">Inline Execution</h3>
                            <p className="text-text-muted text-sm">Run .NET assemblies and unmanaged code strictly in-memory.</p>
                        </div>
                    </SpotlightCard>

                    {/* Feature 5: SOCKS Proxy (Mid) */}
                    <SpotlightCard className="md:col-span-2 md:row-span-1 group">
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><Globe className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-2">SOCKS Proxy</h3>
                            <p className="text-text-muted text-sm">Tunnel external tools through your beacons with a built-in SOCKS4/5 server.</p>
                        </div>
                    </SpotlightCard>

                    {/* Feature 6: Named Pipes (Mid) */}
                    <SpotlightCard className="md:col-span-2 md:row-span-1 group">
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><Share2 className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-2">Named Pipe Pivoting</h3>
                            <p className="text-text-muted text-sm">Daisy-chain agents deep into the network using SMB named pipes.</p>
                        </div>
                    </SpotlightCard>
                </div>
            </section>

            {/* Feature Section 2: GUI / Server */}
            <section className="pt-12 pb-24 px-4 max-w-7xl mx-auto border-b border-white/5">
                <div className="mb-10 text-right">
                    <div className="inline-block p-2 px-3 rounded text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
                        COMPONENT: TEAM SERVER
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Mission Control</h2>
                    <p className="text-text-muted text-lg max-w-2xl ml-auto">
                        A real-time, multi-player command center.
                        Visualize operations, chat with operators, and engage endpoints.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {/* GUI Feature 1: Graph */}
                    <SpotlightCard className="md:col-span-2 md:row-span-1 group">
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><Network className="w-6 h-6" /></div>
                                    <h3 className="text-2xl font-bold mb-2">Infrastructure Graph</h3>
                                    <p className="text-text-muted mb-8 max-w-xs">Visualize pivot chains and agent relationships in real-time. Drag-and-drop to task multiple agents.</p>
                                </div>
                                <img src={dashboardPreview} className="absolute bottom-0 right-0 w-1/2 rounded-tl-xl border-t border-l border-white/10 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* GUI Feature 2: Scripts */}
                    <SpotlightCard className="md:col-span-1 md:row-span-1 group">
                        <div className="p-8 h-full flex flex-col z-10 relative">
                            <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><FileCode className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold mb-2">Automation Manager</h3>
                            <p className="text-text-muted text-sm">Create and schedule scripts to automate routine tasks or complex attack chains.</p>
                        </div>
                    </SpotlightCard>

                    {/* GUI Feature 3: Operator Chat */}
                    <SpotlightCard className="md:col-span-1 md:row-span-1 group">
                        <div className="h-full flex flex-col z-10 relative">
                            <div className="p-8 pb-0">
                                <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><MessageSquare className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold mb-2">Operator Chat</h3>
                            </div>
                            <div className="mt-auto relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 h-1/2 mt-auto" />
                                <img src={chatPreview} className="w-full opacity-60 group-hover:opacity-100 transition-opacity object-cover object-top" />
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* GUI Feature 4: Toxin Interaction */}
                    <SpotlightCard className="md:col-span-2 md:row-span-1 group">
                        <div className="h-full flex flex-col z-10 relative overflow-hidden">
                            <div className="p-8 absolute top-0 left-0 z-20">
                                <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 text-gray-400"><Terminal className="w-6 h-6" /></div>
                                <h3 className="text-2xl font-bold mb-2">Interactive Terminal</h3>
                                <p className="text-text-muted mb-4 max-w-md">
                                    Direct interaction with agents. Tab-complete commands, view file output, and manage processes in real-time.
                                </p>
                            </div>
                            <img src={terminalPreview} className="absolute top-0 right-0 w-2/3 h-full object-cover object-left border-l border-white/10 opacity-50 group-hover:opacity-90 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-10" />
                        </div>
                    </SpotlightCard>
                </div>
            </section>

            {/* Capabilities Deep Dive */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl font-bold mb-8 leading-tight">
                            Full-Spectrum <br />
                            <span className="text-primary">Capability Matrix.</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "Protocol Agnostic", desc: "HTTP/S, DNS, SMB, Custom listeners with malleable command profiles." },
                                { title: "Payload Generation", desc: "Shellcode, EXE, DLL, PowerShell formats with dynamic obfuscation." },
                                { title: "Post-Exploitation", desc: "Built-in mimicry, token manipulation, and process injection tools." },
                                { title: "Extensible", desc: "Load 3rd-party BOFs or write your own scripts in seconds." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                        <p className="text-text-muted text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden group">
                        <img
                            src={teamServer}
                            alt="DarkVein Terminal Interface"
                            className="w-full h-full object-contain object-center opacity-100"
                        />
                    </div>
                </div>
            </section>

            {/* Latest from Blog */}
            <section className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold mb-4">Latest Blogs</h2>
                        <p className="text-text-muted text-lg">Updates from the engineering team.</p>
                    </div>
                    <Link to="/blog" className="hidden md:flex items-center text-primary font-medium hover:text-white transition-colors">
                        View all articles <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {latestPosts.map((post, i) => (
                        <Link key={i} to={`/blog/${post.slug}`} className="group block h-full">
                            <div className="h-full p-8 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:border-primary/30 transition-all flex flex-col">
                                <div className="flex items-center gap-3 text-xs text-text-muted mb-4 uppercase tracking-wider">
                                    <span className="text-primary">{post.tags?.[0] || 'Update'}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                                <p className="text-text-muted text-sm line-clamp-3 mb-6 flex-1">{post.excerpt}</p>
                                <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                                    Read Article <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* DarkVein Comics Section */}
            <section className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
                <div className="bg-gradient-to-br from-[#111] to-[#050505] rounded-3xl border border-white/10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 relative z-10">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-base font-medium">
                                <BookOpen className="w-5 h-5" />
                                Official Comic Series
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-white">
                                DarkVein <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">CHRONICLES</span>
                            </h2>

                            <div className="space-y-6 text-lg text-text-muted">
                                <p>
                                    Beyond the code lies the story. Follow the rise of the DarkVein network as it infiltrates the world's most secure infrastructures.
                                </p>
                            </div>

                            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 hover:border-white/20 transition-all flex items-center group cursor-not-allowed opacity-75">
                                Coming Soon
                                <span className="ml-2 w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            </button>
                        </div>

                        <div className="relative flex justify-center">
                            <div className="absolute inset-4 bg-gradient-to-r from-primary to-emerald-600 rounded-lg blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <img
                                src={comicsPreview}
                                alt="DarkVein Chronicles Preview"
                                className="relative w-3/5 rounded-lg border border-white/10 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
