import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";
import CyberBackground from "../components/CyberBackground";

const Pricing = () => {
    return (
        <div className="relative min-h-screen bg-background text-white selection:bg-primary/20">
            <CyberBackground />

            <div className="relative z-10 pt-32 pb-20 px-4 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                            <Shield className="w-4 h-4" />
                            Secure Acquisition
                        </div>

                        <h1 className="text-5xl font-black tracking-tight leading-tight">
                            Ready to Execute <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">True Red Team</span> Engagements?
                        </h1>

                        <p className="text-xl text-text-muted leading-relaxed">
                            Put organizational defenses to the test with DarkVein.
                            Our framework isolates the target, evades detection, and provides total control.
                        </p>

                        <div className="space-y-6 pt-4">
                            {[
                                { title: "Toxin Agent", desc: "Perform advanced post-exploitation with our signature evasive payload." },
                                { title: "Malleable C2", desc: "Tailor traffic profiles to blend seamlessly with network noise." },
                                { title: "Shadow Community", desc: "Join an elite network of operators sharing custom BOFs and tactics." },

                                { title: "Interoperability", desc: "Extend reach with standard BOF support and pivot integration." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{item.title}</h3>
                                        <p className="text-text-muted text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-8 mt-8">
                            <h3 className="text-2xl font-bold mb-4">Start the Process</h3>
                            <p className="text-text-muted">
                                DarkVein is a professional security tool. We limit purchase to responsible, vetted organizations.
                                Complete the form to begin the verification process.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">First name *</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Last name *</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Company name *</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Business Email *</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Phone number *</label>
                                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Job Title *</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">HQ Country *</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors [&>option]:bg-[#111]">
                                    <option>- Please Select -</option>
                                    <option>United States</option>
                                    <option>United Kingdom</option>
                                    <option>Germany</option>
                                    <option>France</option>
                                    <option>Japan</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wide rounded-lg hover:bg-emerald-400 transition-colors shadow-lg hover:shadow-primary/20 mt-4">
                                Request a Quote
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
