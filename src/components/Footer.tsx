import { Link } from "react-router-dom";
import { Github, Twitter, MessageCircle } from "lucide-react";

import newLogo from "../assets/newlogo.png";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#050505] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <Link to="/" className="mb-6 block w-24">
                            <img src={newLogo} alt="DarkVein Logo" className="w-full" />
                        </Link>
                        <p className="text-text-muted max-w-sm leading-relaxed">
                            The advanced Command & Control framework designed for modern adversary simulation.
                            Built for stealth, speed, and flexibility in complex environments.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-text-muted">
                            <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Engineering Blog</Link></li>
                            <li><Link to="/changelog" className="hover:text-primary transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Community</h4>
                        <ul className="space-y-4 text-text-muted">
                            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a></li>
                            <li><a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Discord</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Twitter</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted">
                    <p>&copy; 2025 DarkVein Framework. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
