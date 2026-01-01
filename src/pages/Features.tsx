import { motion } from "framer-motion";
import {
    Terminal, Lock, Cpu, Network, Share2,
    Database, FileText, Code2, Globe, Shield, Radio
} from "lucide-react";
import CyberBackground from "../components/CyberBackground";

const Features = () => {
    const categories = [
        {
            title: "Stealth & Evasion",
            desc: "Bypass EDR/AV with advanced memory techniques and evasive execution.",
            items: [
                {
                    icon: <Lock className="w-5 h-5 text-purple-400" />,
                    title: "Native API Evasion",
                    desc: "Dynamically resolve NT APIs to bypass ring-3 hooks and monitoring.",
                    tags: ["Ntdll", "Dynamic"]
                },
                {
                    icon: <Cpu className="w-5 h-5 text-blue-400" />,
                    title: "Direct & Indirect Syscalls",
                    desc: "Execute instructions directly via kernel syscalls, avoiding userland API monitoring entirely.",
                    tags: ["x64", "Assembly"]
                },
                {
                    icon: <Shield className="w-5 h-5 text-emerald-400" />,
                    title: "Memory Artifact Evasion",
                    desc: "Heap encryption, sleep obfuscation, and stack spoofing to hide from memory scanners.",
                    tags: ["OpSec", "Sleep"]
                }
            ]
        },
        {
            title: "Network Operations",
            desc: "Pivoting and communication protocols designed for segmented networks.",
            items: [
                {
                    icon: <Share2 className="w-5 h-5 text-orange-400" />,
                    title: "SMB Named Pipes",
                    desc: "Chain agents together using SMB named pipes to pivot deep into restricted subnets.",
                    tags: ["Pivoting", "Peer-to-Peer"]
                },
                {
                    icon: <Globe className="w-5 h-5 text-cyan-400" />,
                    title: "HTTP/S & DNS Listeners",
                    desc: "Robust egress using standard web protocols and DNS tunneling for restricted environments.",
                    tags: ["Egress", "Covert"]
                },
                {
                    icon: <Network className="w-5 h-5 text-indigo-400" />,
                    title: "Dynamic Graph View",
                    desc: "Visualize your entire campaign topology. Track parent-child relationships and infection chains in real-time.",
                    tags: ["Visualization", "C2"]
                }
            ]
        },
        {
            title: "Post-Exploitation",
            desc: "Tools to control the endpoint and harvest valuable intelligence.",
            items: [
                {
                    icon: <Terminal className="w-5 h-5 text-red-500" />,
                    title: "BOF Execution",
                    desc: "Run Beacon Object Files (BOFs) directly in memory. Supports standard COFF format.",
                    tags: ["COFF", "In-Memory"]
                },
                {
                    icon: <Code2 className="w-5 h-5 text-yellow-400" />,
                    title: "Unmanaged PowerShell",
                    desc: "Execute PowerShell scripts within the agent process without spawning powershell.exe.",
                    tags: ["Automation", ".NET"]
                },
                {
                    icon: <FileText className="w-5 h-5 text-gray-400" />,
                    title: "Script Engine",
                    desc: "Automate complex workflows and tasking sequences with the built-in scripting engine.",
                    tags: ["Workflow", "Macros"]
                }
            ]
        }
    ];

    return (
        <div className="relative min-h-screen bg-background text-white selection:bg-primary/20">
            <CyberBackground />

            <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                        <Terminal className="w-4 h-4" />
                        Framework Capabilities
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                        Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Operative</span> Toolset
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                        Designed for adversaries who require precision, stealth, and total control over the engagement.
                    </p>
                </motion.div>

                <div className="space-y-32">
                    {categories.map((category, catIndex) => (
                        <div key={catIndex} id={category.title.toLowerCase().replace(/\s+/g, '-')}>
                            <div className="flex items-end gap-6 mb-12 border-b border-white/10 pb-6">
                                <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                                <p className="text-text-muted text-lg pb-1 max-w-2xl">{category.desc}</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                                {category.items.map((item, i) => (
                                    <div key={i} className="group relative">
                                        <div className="absolute -left-6 top-0 bottom-0 w-px bg-white/10 group-hover:bg-primary/50 transition-colors duration-500"></div>
                                        <div className="absolute -left-[25px] top-0 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors duration-500"></div>

                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-0 text-primary/80 group-hover:text-primary transition-colors group-hover:scale-110 duration-300 transform origin-left">
                                                {item.icon}
                                            </div>
                                            <div className="flex gap-2">
                                                {item.tags.map((tag, t) => (
                                                    <span key={t} className="text-[10px] font-mono text-primary/60 border border-primary/20 px-1.5 py-0.5 rounded-sm bg-primary/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-text-muted text-sm leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
