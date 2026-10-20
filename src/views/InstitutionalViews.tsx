import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      <div className="border-b border-stone-300 pb-6">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          Institutional Charter & Editorial Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
          About TenderWise India
        </h1>
        <p className="text-base text-stone-600 mt-2 font-sans leading-relaxed">
          An independent digital research publication dedicated to demystifying public procurement, GeM seller guidelines, and statutory compliance in India.
        </p>
      </div>

      {/* Critical Non-Affiliation Notice */}
      <div className="p-5 bg-stone-100 border border-stone-300 text-xs text-stone-800 leading-relaxed space-y-2">
        <h3 className="font-bold text-stone-950 uppercase tracking-wide">
          Mandatory Non-Affiliation Disclosure
        </h3>
        <p>
          TenderWise India is an entirely independent research publication. We are NOT affiliated with, authorized by, endorsed by, or in any way officially connected with the Government of India, the Government e-Marketplace (GeM SPV), the Central Public Procurement Portal (CPPP / National Informatics Centre), or any central ministry, state government, or public sector undertaking.
        </p>
        <p>
          We do not issue tender notices, evaluate bids, award contracts, or act as an intermediary, agent, or consultancy for tender awards. We make NO claim of guaranteed contract wins, inside access, or fast-track government approvals.
        </p>
      </div>

      <div className="space-y-6 text-sm text-stone-700 leading-relaxed font-sans">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Our Editorial Purpose</h2>
        <p>
          Every year, the Indian public sector spends upwards of ₹20 lakh crore on infrastructure, healthcare, IT, goods, and maintenance services. However, first-time entrepreneurs, MSMEs, and students often struggle with Byzantine regulatory terminology, conflicting portal instructions, and misleading "guaranteed win" commercial solicitations.
        </p>
        <p>
          TenderWise India addresses this information gap by synthesizing official procurement rules—principally the <strong>General Financial Rules (GFR), 2017</strong>, the <strong>Manual for Procurement of Goods (2022)</strong>, and the <strong>Public Procurement Policy for MSEs Order (2012)</strong>—into readable, source-cited research dossiers.
        </p>

        <h2 className="font-serif text-2xl font-bold text-stone-900">Research & Verification Standards</h2>
        <ul className="list-disc pl-6 space-y-2 text-stone-700">
          <li><strong>Zero Fabrication:</strong> We never invent tender notices, reference numbers, submission deadlines, or case studies.</li>
          <li><strong>Primary Source Grounding:</strong> Every regulatory claim is hyperlinked to verified government repositories ending in <code>.gov.in</code>.</li>
          <li><strong>Transparent Missing Data:</strong> Where a tender summary omits estimated value, technical solvency, or experience clauses, we label it as unavailable rather than fabricating an estimate.</li>
        </ul>

        {/* Visual Editorial Charter Feature */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
          <div className="border border-stone-200 bg-stone-50 p-3 space-y-2">
            <div className="aspect-[16/10] overflow-hidden bg-stone-200">
              <ImageWithFallback
                src="/images/editorial/research-desk.jpg"
                alt="TenderWise India Editorial and Procurement Research Desk"
                fallbackCategory="Editorial Desk"
                fallbackTitle="Collaborative Research Desk"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif font-bold text-stone-900 text-sm block">Editorial Research Desk</span>
            <p className="text-xs text-stone-600">Cross-referencing Gazette circulars, GFR 2017 amendments, and official SBD clauses.</p>
          </div>

          <div className="border border-stone-200 bg-stone-50 p-3 space-y-2">
            <div className="aspect-[16/10] overflow-hidden bg-stone-200">
              <ImageWithFallback
                src="/images/editorial/statutory-audit.jpg"
                alt="Statutory compliance review of government bidding documents"
                fallbackCategory="Compliance Audit"
                fallbackTitle="Statutory Review Protocol"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-serif font-bold text-stone-900 text-sm block">Statutory Compliance Protocol</span>
            <p className="text-xs text-stone-600">Verifying tender eligibility criteria, turnover exemption rules, and EMD submission mechanisms.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-sm text-stone-700 leading-relaxed">
      <div className="border-b border-stone-300 pb-6">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          Legal Agreement
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-950 mt-1">
          Terms of Service
        </h1>
        <p className="text-xs text-stone-500 mt-1">Effective Date: March 15, 2026 · Version 1.0</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900">1. Acceptance of Terms</h2>
        <p>
          By accessing TenderWise India, you agree to these Terms of Service. If you disagree with any portion, you must discontinue using the platform.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">2. Nature of Service: Educational Research Only</h2>
        <p>
          All content, dossiers, calculation models, and tender notices on TenderWise India are published strictly for educational, informational, and academic research purposes. They do not constitute legal, financial, or tender-bidding counsel.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">3. Non-Government Entity Disclaimer</h2>
        <p>
          TenderWise India is not a government portal. Users must submit bids, upload digital signatures, and transfer EMD directly on the official portals (gem.gov.in, eprocure.gov.in, etc.) designated in each individual Notice Inviting Tender.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">4. Intellectual Property</h2>
        <p>
          Original editorial analyses, research compilations, and editorial articles are protected under copyright law. Fair academic quotation with attribution is welcomed; systematic scraping or commercial republication is prohibited.
        </p>
      </div>
    </div>
  );
};

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-sm text-stone-700 leading-relaxed">
      <div className="border-b border-stone-300 pb-6">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          Data Governance
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-950 mt-1">
          Privacy & Data Charter
        </h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900">1. Information We Collect</h2>
        <p>
          We collect minimal personal data: your name, email address, and authentication session token necessary to maintain your saved bookmarks, reading preferences, and session.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">2. No Sale of Vendor Data</h2>
        <p>
          We do not sell, rent, or monetize user data to commercial lead-generation agencies, third-party tender brokers, or advertising networks.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">3. Right to Complete Deletion</h2>
        <p>
          Under our data protection policy, you can permanently delete your account, saved dossiers, and bookmarked tenders at any time directly through your account settings.
        </p>
      </div>
    </div>
  );
};

export const SubscriptionPolicyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 text-sm text-stone-700 leading-relaxed">
      <div className="border-b border-stone-300 pb-6">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          Institutional Policy & Charter
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-950 mt-1">
          Open Access & Editorial Policy
        </h1>
        <p className="text-xs text-stone-500 mt-1">Published in accordance with transparency and open research principles</p>
      </div>

      <div className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900">1. Universal Open Access</h2>
        <p>
          TenderWise India publishes comprehensive research guides, statutory breakdowns, and procedural analysis on Indian government procurement entirely free of charge. We do not enforce paywalls, article unlock charges, or credit systems.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">2. No Subscriptions or Monetisation</h2>
        <p>
          All published research, tender discovery tools, multi-tender comparison tables, and statutory checklists are accessible without a paid subscription. User registration is purely optional for saving bookmarks and organizing research.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">3. Independent Public Interest Research</h2>
        <p>
          TenderWise India is an independent research publication. We do not sell tender awards, provide paid bidding representation, or claim insider connections with government procurement bodies. All guidance is grounded in primary public documents, including the General Financial Rules (GFR), 2017 and GeM terms.
        </p>

        <h2 className="font-serif text-xl font-bold text-stone-900">4. Editorial Corrections and Inquiries</h2>
        <p>
          We welcome fact-check queries and regulatory update notifications from contractors, procurement officers, and legal practitioners. Submissions can be sent directly through our Editorial Contact desk.
        </p>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Editorial Fact-Check / Correction');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; referenceId?: string; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, category, subject, message })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResult({
          success: true,
          referenceId: data.referenceId,
          message: data.message
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to submit inquiry.'
        });
      }
    } catch {
      setResult({
        success: false,
        message: 'Network error submitting your query. Please try again or email us directly.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      <div className="border-b border-stone-300 pb-6">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          Institutional Contact & Research Desk
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-950 mt-1">
          Editorial & Research Inquiries
        </h1>
        <p className="text-sm text-stone-600 mt-2 font-sans leading-relaxed">
          Contact the TenderWise India research team for statutory corrections, procurement fact-checking submissions, academic citations, or institutional research partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Channels */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-stone-100 border border-stone-200 p-6 space-y-4 text-xs text-stone-700">
            <h3 className="font-serif text-lg font-bold text-stone-950">
              Editorial Desk Directives
            </h3>
            <p className="leading-relaxed">
              We review procurement policy circulars (GFR 2017, Ministry of Finance OM, GeM SPV GTC revisions, and MSME Orders) continuously. If you spot a statutory amendment or corrigendum not reflected in our dossiers, notify our research team.
            </p>
            <div className="pt-3 border-t border-stone-200 space-y-2">
              <div>
                <span className="font-bold text-stone-900 block">Editorial Queries & Fact-Checks:</span>
                <span className="font-mono text-stone-600">editorial@tenderwise.in</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Public Procurement Research Desk:</span>
                <span className="font-mono text-stone-600">desk@tenderwise.in</span>
              </div>
              <div>
                <span className="font-bold text-stone-900 block">Response Commitment:</span>
                <span className="text-stone-600">Within 2 Indian business days</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-stone-300 text-[11px] text-stone-600 space-y-2">
            <span className="font-bold text-stone-900 uppercase block tracking-wider">
              Legal Clarification
            </span>
            <p>
              TenderWise India cannot accept tender bids, process earnest money (EMD), or intervene in dispute resolutions with government procuring officers. Such requests should be directed directly to the procuring officer identified in the relevant NIT.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white border border-stone-300 p-6 sm:p-8 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-950 mb-2">
              Send an Inquiry to the Research Desk
            </h3>

            {result && (
              <div
                className={`p-4 text-xs leading-relaxed border ${
                  result.success
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <span className="font-bold block mb-1">
                  {result.success ? 'Inquiry Submitted Successfully' : 'Submission Failed'}
                </span>
                <p>{result.message}</p>
                {result.referenceId && (
                  <p className="font-mono mt-1 font-semibold">
                    Reference ID: {result.referenceId}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Your Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Radhika Sharma"
                required
                className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. radhika@organization.in"
                required
                className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Inquiry Department / Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full p-2.5 border border-stone-300 text-sm bg-white focus:outline-none focus:border-[#0E4C56]"
              >
                <option value="Editorial Fact-Check / Correction">Editorial Fact-Check / Correction</option>
                <option value="RTI & Public Procurement Research">RTI & Public Procurement Research</option>
                <option value="New Official Portal Recommendation">New Official Portal Recommendation</option>
                <option value="Academic Citation & Data Inquiry">Academic Citation & Data Inquiry</option>
                <option value="General Technical Support">General Technical Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Citation verification for MSE Exemption in GFR Rule 153"
                className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-800">Message / Regulatory Feedback *</label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Please describe your query, citation reference, or question with specific portal or clause numbers if applicable..."
                required
                className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C] transition-colors disabled:opacity-50"
            >
              {submitting ? 'Transmitting to Desk...' : 'Submit Inquiry to Editorial Desk'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const AuthView: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { login, register, switchDemoRole } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    let ok = false;
    if (isRegister) {
      ok = await register(name, email);
    } else {
      ok = await login(email);
    }
    setSubmitting(false);
    if (ok) {
      onNavigate('dashboard');
    } else {
      alert('Authentication failed. Please verify your details.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-[#0E4C56]">
          TenderWise India Accounts
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-950">
          {isRegister ? 'Join TenderWise India' : 'Account Sign In'}
        </h1>
        <p className="text-xs text-stone-600">
          {isRegister
            ? 'Create a free account to bookmark research dossiers, track verified live tenders, and organize your procurement study.'
            : 'Access your saved bookmarks, reading history, and research dashboard.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-stone-300 p-6 space-y-4">
        {isRegister && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-800">Your Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Vikramaditya Sen"
              required
              className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-stone-800">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="e.g. researcher@tenderwise.in"
            required
            className="w-full p-2.5 border border-stone-300 text-sm focus:outline-none focus:border-[#0E4C56]"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2.5 bg-[#0E4C56] text-white text-xs font-semibold hover:bg-[#09353C] transition-colors disabled:opacity-50"
        >
          {submitting ? 'Authenticating...' : isRegister ? 'Register Free Account' : 'Sign In'}
        </button>

        <div className="pt-2 text-center text-xs text-stone-600">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-[#0E4C56] font-semibold hover:underline"
              >
                Sign In here
              </button>
            </span>
          ) : (
            <span>
              New to TenderWise?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-[#0E4C56] font-semibold hover:underline"
              >
                Register Free
              </button>
            </span>
          )}
        </div>
      </form>

      {/* Quick Demo Switcher */}
      <div className="p-4 bg-stone-100 border border-stone-200 text-xs space-y-2">
        <span className="font-bold text-stone-900 block">Instant Evaluation Accounts:</span>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={async () => {
              await switchDemoRole('user');
              onNavigate('dashboard');
            }}
            className="flex-1 p-2 bg-white border border-stone-300 text-stone-800 text-left hover:bg-stone-50"
          >
            <span className="font-bold block">1. Standard User</span>
            <span className="text-[11px] text-stone-500">Standard researcher account (save articles & tenders)</span>
          </button>
          <button
            onClick={async () => {
              await switchDemoRole('admin');
              onNavigate('admin');
            }}
            className="flex-1 p-2 bg-white border border-stone-300 text-stone-800 text-left hover:bg-stone-50"
          >
            <span className="font-bold block">2. Editorial Admin</span>
            <span className="text-[11px] text-stone-500">Editorial management & article publishing panel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
