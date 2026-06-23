import type { Metadata } from 'next';
import Link from 'next/link';
import UpdateBanner from '@/components/UpdateBanner';
import ReportForm from '@/components/ReportForm';
import { AFFILIATES, AFFILIATE_REL } from '@/lib/affiliates';

interface DocumentItem {
  name: string;
  required: boolean;
  notes: string;
}

interface VisaDocData {
  title: string;
  subtitle: string;
  legalBasis: string;
  salaryThreshold?: string;
  processingTime: string;
  documents: DocumentItem[];
  tips: string[];
}

const VISA_DOCS: Record<string, VisaDocData> = {
  'work-visa': {
    title: 'Work Visa (§18 AufenthG)',
    subtitle: 'For skilled workers with a job offer in Germany',
    legalBasis: '§18 Aufenthaltsgesetz (AufenthG)',
    processingTime: '2–6 weeks',
    documents: [
      { name: 'Valid passport (min. 6 months validity beyond intended stay)', required: true, notes: 'Bring original + 2 copies' },
      { name: 'Completed visa application form', required: true, notes: 'Download from your local German consulate or Ausländerbehörde' },
      { name: 'Biometric passport photos (2)', required: true, notes: '35×45mm, white background, recent (max 6 months old)' },
      { name: 'Employment contract', required: true, notes: 'Must state gross annual salary explicitly. Signed by employer.' },
      { name: 'Proof of professional qualifications', required: true, notes: 'University degree + certified German translation' },
      { name: 'Recognition of foreign qualifications (if applicable)', required: false, notes: 'Required if your degree is from outside EU/EEA. Apply via anabin or IQ Network.' },
      { name: 'Health insurance certificate', required: true, notes: 'Must cover full stay. Statutory (GKV) or private (PKV).' },
      { name: 'Registration certificate (Meldebescheinigung)', required: true, notes: 'Register at your local Einwohnermeldeamt within 2 weeks of arrival.' },
      { name: 'Rental agreement or accommodation proof', required: true, notes: 'Lease contract or letter from employer confirming accommodation.' },
      { name: 'Employer declaration (Erklärung zum Beschäftigungsverhältnis)', required: true, notes: 'Standard form from Ausländerbehörde. Employer must complete.' },
      { name: 'BA approval (Federal Employment Agency)', required: false, notes: 'Often handled by the Ausländerbehörde on your behalf.' },
    ],
    tips: [
      'Get your employment contract to state gross annual salary — net salary alone is often rejected.',
      'Have all non-German documents translated by a certified translator (vereidigter Übersetzer).',
      'Check if your foreign degree requires recognition (Anerkennung) before applying.',
      'Book your appointment as early as possible — slots fill up 8–12 weeks in advance.',
    ],
  },
  'blue-card': {
    title: 'EU Blue Card (§18b AufenthG)',
    subtitle: 'For highly qualified workers earning above the threshold',
    legalBasis: '§18b Aufenthaltsgesetz (AufenthG)',
    salaryThreshold: '€43,800 gross/year (2024) or €39,682 for shortage occupations',
    processingTime: '2–4 weeks',
    documents: [
      { name: 'Valid passport (min. 6 months validity)', required: true, notes: 'Original + 2 copies' },
      { name: 'Completed application form', required: true, notes: 'Antrag auf Erteilung eines Aufenthaltstitels' },
      { name: 'Biometric passport photos (2)', required: true, notes: '35×45mm, white background' },
      { name: 'Employment contract with gross annual salary', required: true, notes: 'MUST state gross annual salary meeting the threshold (€43,800 or €39,682 for shortage occupations).' },
      { name: 'University degree certificate', required: true, notes: 'Bachelor\'s degree minimum. Plus certified German translation.' },
      { name: 'Degree recognition or equivalency proof', required: true, notes: 'EU/EEA degrees: usually automatic. Others: check anabin database. If listed as H+, no further recognition needed.' },
      { name: 'Health insurance certificate', required: true, notes: 'Statutory or private, must be valid from first day of employment.' },
      { name: 'Registration certificate (Meldebescheinigung)', required: true, notes: 'Must be registered at German address.' },
      { name: 'Accommodation proof', required: true, notes: 'Rental contract, or employer accommodation confirmation.' },
    ],
    tips: [
      'Blue Card gives faster path to permanent residence (21 months with B1 German, 33 months without).',
      'Check the anabin database to see if your degree needs formal recognition.',
      'Shortage occupations (MINT, healthcare, IT) have a lower salary threshold.',
      'Your family can join immediately under Blue Card family reunification rules.',
    ],
  },
  'student-visa': {
    title: 'Student Visa (§16b AufenthG)',
    subtitle: 'For studying at a German university or language school',
    legalBasis: '§16b Aufenthaltsgesetz (AufenthG)',
    processingTime: '4–8 weeks',
    documents: [
      { name: 'Valid passport (min. 6 months validity)', required: true, notes: 'Original + 2 copies' },
      { name: 'University/school enrollment confirmation', required: true, notes: 'Official Immatrikulationsbescheinigung. Must be unconditional.' },
      { name: 'Blocked account (Sperrkonto) proof', required: true, notes: '€11,208/year (2024). Fintiba, Coracle, or Deutsche Bank blocked account.' },
      { name: 'Health insurance', required: true, notes: 'Statutory student insurance (e.g., TK, AOK, Barmer). ~€110/month.' },
      { name: 'Accommodation proof', required: true, notes: 'Student dormitory confirmation or private rental contract.' },
      { name: 'Biometric passport photos (2)', required: true, notes: '35×45mm, white background' },
      { name: 'Completed application form', required: true, notes: '' },
      { name: 'Academic transcripts', required: false, notes: 'May be requested depending on institution.' },
      { name: 'Language certificate', required: false, notes: 'German (B2/C1 for German programs) or English (IELTS/TOEFL for English programs).' },
    ],
    tips: [
      'Open your blocked account at least 6 weeks before your appointment — it takes time to process.',
      'Student visas allow 20 hours/week work (40 hours in vacation periods).',
      'After graduation you get an 18-month job-seeker extension.',
      'Register at the university and Einwohnermeldeamt within 2 weeks of arrival.',
    ],
  },
  'family-reunification': {
    title: 'Family Reunification (§27–§36 AufenthG)',
    subtitle: 'Joining a family member who holds a German residence permit',
    legalBasis: '§27–§36 Aufenthaltsgesetz (AufenthG)',
    processingTime: '4–12 weeks',
    documents: [
      { name: 'Valid passport', required: true, notes: 'Applicant\'s passport + 2 copies' },
      { name: 'Biometric photos (2)', required: true, notes: '' },
      { name: 'Marriage certificate / birth certificate', required: true, notes: 'Official with certified German translation. Apostille if required by country of origin.' },
      { name: 'Sponsor\'s residence permit copy', required: true, notes: 'The family member already in Germany must provide their current Aufenthaltstitel.' },
      { name: 'Sponsor\'s proof of income', required: true, notes: 'Last 3 salary slips + employment contract of the sponsoring family member.' },
      { name: 'Accommodation proof', required: true, notes: 'Rental contract showing adequate space for family.' },
      { name: 'Health insurance for applicant', required: true, notes: 'Can be covered under sponsor\'s family health insurance (Familienversicherung).' },
      { name: 'Basic German language proof', required: false, notes: 'A1 level (Goethe Institut) usually required for spouses. Exceptions apply for Blue Card holders\' spouses.' },
      { name: 'Completed application form', required: true, notes: '' },
    ],
    tips: [
      'Spouses of Blue Card holders are exempt from the A1 German language requirement.',
      'Ensure the accommodation is large enough (typically 12m² per person minimum).',
      'Apostille requirements vary by country — check with your local German embassy.',
      'Children under 16 can join without German language requirement.',
    ],
  },
  'freelance-visa': {
    title: 'Freelance Visa (§21 AufenthG)',
    subtitle: 'For self-employed professionals and freelancers',
    legalBasis: '§21 Aufenthaltsgesetz (AufenthG)',
    processingTime: '6–12 weeks',
    documents: [
      { name: 'Valid passport', required: true, notes: 'Original + 2 copies' },
      { name: 'Biometric photos (2)', required: true, notes: '' },
      { name: 'Business plan', required: true, notes: 'Detailed plan covering services, target clients, revenue projections, market analysis. Minimum 5 pages.' },
      { name: 'Client contracts (min. 2–3)', required: true, notes: 'Signed contracts showing projected annual income. Must meet the Mindestgehalt threshold.' },
      { name: 'Proof of professional qualifications', required: true, notes: 'Degree, portfolio, or equivalent experience documentation.' },
      { name: 'Reference letters from clients', required: false, notes: 'Strongly recommended. Increases credibility of business plan.' },
      { name: 'Financial reserves proof', required: true, notes: 'Bank statements showing at least 3 months of living expenses (€3,500–€5,000+).' },
      { name: 'Professional liability insurance quote', required: false, notes: 'Some offices require this. Get a quote even if not yet purchased.' },
      { name: 'Health insurance', required: true, notes: 'Private or statutory (if qualifying). Freelancers often need private insurance.' },
      { name: 'Registration certificate (Meldebescheinigung)', required: true, notes: '' },
      { name: 'Accommodation proof', required: true, notes: '' },
    ],
    tips: [
      'Get client contracts to explicitly state annual/total contract value — vague agreements are commonly rejected.',
      'The business plan is critical. Have a German speaker review it before your appointment.',
      'Some offices distinguish between Freiberufler (liberal professions: artists, journalists, doctors, IT) and Gewerbetreibende. Know which category applies to you.',
      'Tax registration (Steuernummer) is typically obtained after the visa is granted — if asked, clarify this to the officer.',
    ],
  },
  'settlement-permit': {
    title: 'Settlement Permit / Niederlassungserlaubnis (§9 AufenthG)',
    subtitle: 'Permanent residence permit — the final step',
    legalBasis: '§9 Aufenthaltsgesetz (AufenthG)',
    processingTime: '4–8 weeks',
    documents: [
      { name: 'Valid passport', required: true, notes: '' },
      { name: 'Current residence permit', required: true, notes: 'Must have held a qualifying permit for 5 years (or 21/33 months for Blue Card holders).' },
      { name: 'German language certificate (B1 minimum)', required: true, notes: 'Goethe Institut B1 or equivalent. DTZ also accepted.' },
      { name: 'Proof of employment / financial self-sufficiency', required: true, notes: 'Current employment contract + last 3 salary slips. Or pension/assets proof.' },
      { name: 'Pension contributions history', required: true, notes: 'DRV Auskunft — obtainable from Deutsche Rentenversicherung online.' },
      { name: 'No criminal record certificate', required: true, notes: 'Führungszeugnis — apply via BVA portal, takes 2–4 weeks. Request early.' },
      { name: 'Health insurance certificate', required: true, notes: '' },
      { name: 'Accommodation proof (adequate space)', required: true, notes: '' },
      { name: 'Integration course certificate (if applicable)', required: false, notes: 'May be required or reduce required residency period.' },
      { name: 'Biometric photos (2)', required: true, notes: '' },
    ],
    tips: [
      'Apply for your Führungszeugnis 4–6 weeks before your appointment — it takes time to arrive.',
      'Blue Card holders can apply after 21 months with B1 German, or 33 months without.',
      'Regular residence permits typically require 5 years of continuous legal residence.',
      'The Niederlassungserlaubnis is indefinite and does not need renewal — it\'s your final visa milestone in Germany.',
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(VISA_DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const visa = VISA_DOCS[params.slug];
  if (!visa) return { title: 'Not Found' };
  return {
    title: `${visa.title} – Required Documents | GermanySolved`,
    description: visa.subtitle,
  };
}

export default function AcceptedDocumentsPage({ params }: { params: { slug: string } }) {
  const visa = VISA_DOCS[params.slug];

  if (!visa) {
    return (
      <main style={{ padding: '80px 40px', textAlign: 'center' }}>
        <h1>Visa type not found</h1>
        <Link href="/">← Back to home</Link>
      </main>
    );
  }

  const required = visa.documents.filter((d) => d.required);
  const optional = visa.documents.filter((d) => !d.required);

  return (
    <main>
      <UpdateBanner lastUpdated="2026-05-15" newReports={12} />

      <div className="page-hero">
        <div className="page-hero-inner">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / <Link href="#">Accepted Documents</Link> / {visa.title.split(' (')[0]}
          </div>
          <div className="case-badge" style={{ marginBottom: 12 }}>Document Checklist</div>
          <h1 className="page-title">{visa.title}</h1>
          <p className="page-subtitle">{visa.subtitle}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--ink-mid)' }}>
            <span>⚖️ {visa.legalBasis}</span>
            <span>⏱ Processing: {visa.processingTime}</span>
            {visa.salaryThreshold && <span>💶 Threshold: {visa.salaryThreshold}</span>}
          </div>
        </div>
      </div>

      <div className="content-wrap">
        <div className="content-main">
          <section className="section-block">
            <h2 className="section-heading">Required Documents ({required.length})</h2>
            <div className="document-checklist">
              {required.map((doc, i) => (
                <div key={i} className="document-item required">
                  <div className="doc-check">✓</div>
                  <div className="doc-body">
                    <div className="doc-name">{doc.name}</div>
                    {doc.notes && <div className="doc-notes">{doc.notes}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {optional.length > 0 && (
            <section className="section-block">
              <h2 className="section-heading">Optional / Situational ({optional.length})</h2>
              <div className="document-checklist">
                {optional.map((doc, i) => (
                  <div key={i} className="document-item optional">
                    <div className="doc-check optional-check">○</div>
                    <div className="doc-body">
                      <div className="doc-name">{doc.name}</div>
                      {doc.notes && <div className="doc-notes">{doc.notes}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="section-block tips-section">
            <h2 className="section-heading">Tips from the Community</h2>
            <ul className="tips-list">
              {visa.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="content-sidebar">
          <div className="sidebar-card">
            <h3>Other Visa Types</h3>
            <ul className="sidebar-links">
              {Object.entries(VISA_DOCS).map(([slug, v]) => (
                <li key={slug}>
                  <Link href={`/accepted-documents/${slug}`}>{v.title.split(' (')[0]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-card">
            <h3>Health Insurance</h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--ink-light)', marginBottom: '12px' }}>
              {AFFILIATES.fintiba.description}
            </p>
            <a
              href={AFFILIATES.fintiba.url}
              rel={AFFILIATE_REL}
              target="_blank"
              className="btn-primary"
              style={{ display: 'inline-flex' }}
            >
              {AFFILIATES.fintiba.label} →
            </a>
          </div>
          <div className="sidebar-card">
            <h3>Related Resources</h3>
            <ul className="sidebar-links">
              <li><Link href="/rejection-reasons/work-visa">Common Rejection Reasons</Link></li>
              <li><Link href="/waiting-times/berlin">Berlin Wait Times</Link></li>
              <li><Link href="/compare/berlin-vs-munich">Compare Offices</Link></li>
              <li><Link href="/report">Submit Your Report</Link></li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="report-form-section">
        <div className="report-form-inner">
          <h2>Recently Applied?</h2>
          <p>Share which documents were actually requested at your appointment to help future applicants.</p>
          <ReportForm />
        </div>
      </div>
    </main>
  );
}
