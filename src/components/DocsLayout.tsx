import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    Book, Server, Terminal, Share2, Shield, Activity,
    ChevronRight, Menu, X, Code, FileText
} from "lucide-react";
import Navbar from "../components/Navbar";

const DocsLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();

    const chapters = [
        {
            title: "Welcome",
            items: [
                { title: "Introduction", path: "/docs", icon: <Book size={16} /> },
                { title: "Architecture", path: "/docs/architecture", icon: <Activity size={16} /> },
            ]
        },
        {
            title: "Getting Started",
            items: [
                { title: "Installation", path: "/docs/installation", icon: <Terminal size={16} /> },
                { title: "Quick Start", path: "/docs/quickstart", icon: <Zap size={16} /> },
            ]
        },
        {
            title: "Infrastructure",
            items: [
                { title: "Listeners", path: "/docs/listeners", icon: <Server size={16} /> },
                { title: "Redirectors", path: "/docs/redirectors", icon: <Share2 size={16} /> },
            ]
        },
        {
            title: "Toxin Agent",
            items: [
                { title: "Core Features", path: "/docs/toxin-features", icon: <Shield size={16} /> },
                { title: "Console Commands", path: "/docs/commands", icon: <Terminal size={16} /> },
                { title: "Artifact Kit", path: "/docs/artifact-kit", icon: <Code size={16} /> },
            ]
        },
        {
            title: "Post Exploitation",
            items: [
                { title: "Pivoting (SMB)", path: "/docs/pivoting", icon: <Share2 size={16} /> },
                { title: "Beacon Object Files", path: "/docs/bofs", icon: <FileText size={16} /> },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex flex-1 pt-20 max-w-7xl mx-auto w-full">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-background/95 border-r border-border overflow-y-auto px-4 py-6 transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        }`}
                >
                    <div className="space-y-8">
                        {chapters.map((chapter, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-sm text-text-muted uppercase tracking-wider mb-3 px-2">
                                    {chapter.title}
                                </h3>
                                <ul className="space-y-1">
                                    {chapter.items.map((item) => (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-text-muted hover:text-white hover:bg-secondary"
                                                    }`}
                                            >
                                                {item.icon}
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 min-w-0 px-4 py-8 lg:px-12">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden mb-4 p-2 bg-secondary rounded-lg"
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                    <div className="prose prose-invert max-w-none">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

// Icon fix for undefined variable
const Zap = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

export default DocsLayout;
