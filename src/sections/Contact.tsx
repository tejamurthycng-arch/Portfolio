import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  Copy, 
  Check, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    // Direct, transparent delivery via prefilled mailto
    const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    window.location.href = mailtoUrl;

    setSubmittedStatus("Your email client was opened to deliver your message. Thank you!");
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="// 07. GET IN TOUCH"
          title="Let's Build Something Together"
          subtitle="Whether you have an inquiry, open-source project, or engineering opportunity, I'd love to connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Cards with Motion */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Primary Email Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-glass backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-white/[0.05] text-rose-400 border border-white/[0.1] shadow-sm">
                  <Mail className="w-6 h-6" />
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-white/[0.05] hover:bg-white/[0.1] text-rose-300 border border-white/[0.1] transition-all"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Direct Email
              </h3>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-lg sm:text-xl font-bold text-white hover:text-rose-400 transition-colors block break-all font-mono"
              >
                {personalInfo.email}
              </a>
              <p className="text-xs text-slate-400 mt-2">
                Usually responds within 24 hours.
              </p>
            </div>

            {/* Location & Academic Base */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4 backdrop-blur-2xl shadow-glass">
              <div className="flex items-start gap-3.5">
                <span className="p-2.5 rounded-xl bg-white/[0.05] text-rose-400 border border-white/[0.08] mt-0.5">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Location
                  </h4>
                  <p className="text-white font-medium text-base">
                    {personalInfo.location}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    College: {personalInfo.college}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">GitHub Profile:</span>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-rose-400 hover:text-white flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  @{personalInfo.githubUsername}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">LinkedIn:</span>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-rose-400 hover:text-white flex items-center gap-1"
                  title="Configurable LinkedIn URL"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  Connect
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Availability status */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3 backdrop-blur-xl">
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <p className="text-xs text-slate-300">
                Open to internships, open source collaborations, and software development discussions.
              </p>
            </div>

          </motion.div>

          {/* Right Column: Contact Form with Motion */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] shadow-glass backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-rose-400" />
                <h3 className="text-lg font-bold text-white">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white text-base sm:text-sm placeholder:text-slate-600 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white text-base sm:text-sm placeholder:text-slate-600 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white text-base sm:text-sm placeholder:text-slate-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Tejamurthy, I came across your work and would love to connect regarding..."
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.08] focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white text-base sm:text-sm placeholder:text-slate-600 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {submittedStatus && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{submittedStatus}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<Send className="w-4 h-4" />}
                  className="w-full justify-center bg-gradient-to-r from-rose-600 to-red-600 shadow-[0_0_20px_rgba(225,29,72,0.35)]"
                >
                  Send via Email Client
                </Button>

                <p className="text-[11px] font-mono text-slate-500 text-center mt-2">
                  🔒 Transparent delivery: Opens your configured mail client directly to dispatch message to tejamurthycng@gmail.com.
                </p>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
