import type { Metadata } from 'next';
import Link from 'next/link';
import UpdateBanner from '@/components/UpdateBanner';
import ReportForm from '@/components/ReportForm';

interface RejectionCategory {
  slug: string;
  title: string;
  visaType: string;
  legalBasis: string;
  description: string;
  reasons: { title: string; description: string; frequency: 'very common' | 'common' | 'occasional' }[];
  appealProcess: string[];
  preventionTips: string[];
  successRate: number;
  avgAppealDays: number;
}

const CATEGORIES: Record<string, RejectionCategory> = {
  'work-visa': {
    slug: 'work-visa',
    title: 'Work Visa Rejection Reasons',
    visaType: 'Work Visa (§18 AufenthG)',
    legalBasis: '§18 Aufenthaltsgesetz (AufenthG)',
    description:
      'Work visa (§18 AufenthG) rejections are among the most common in Germany. Most can be avoided with proper document preparation.',
    successRate: 68,
    avgAppealDays: 42,
    reasons: [
      {
        title: 'Salary below threshold or incorrectly documented',
        description: 'The offer letter must state gross annual salary explicitly. Net or monthly figures are frequently rejected. For skilled workers, the minimum is €45,300/year (2026).',
        frequency: 'very common',
      },
      {
        title: 'Professional qualifications not recognized',
        description: 'Foreign degrees must be recognized by anabin (database) or officially evaluated. Unrecognized qualifications are the top reason for work visa denial.',
        frequency: 'very common',
      },
      {
        title: 'Missing or outdated health insurance certificate',
        description: 'The certificate must show coverage valid from the intended start date. Travel insurance is not accepted — public or private statutory health insurance required.',
        frequency: 'common',
      },
      {
        title: 'Employment contract not in German or with certified translation',
        description: 'Contracts in other languages must be accompanied by a certified German translation by a sworn translator.',
        frequency: 'common',
      },
      {
        title: 'Job not matching approved qualification',
        description: 'The job role must match the recognized qualification. An engineer working as a data analyst may face issues if the connection isn\'t clearly documented.',
        frequency: 'occasional',
      },
      {
        title: 'Priority check failed (Vorrangprüfung)',
        description: 'For non-shortage-occupation jobs, the BA (Federal Employment Agency) checks whether an equally qualified EU/EEA citizen is available. This can delay or deny applications.',
        frequency: 'occasional',
      },
    ],
    appealProcess: [
      'Receive written rejection (Ablehnungsbescheid) — must include legal basis',
      'You have 1 month to file a Widerspruch (objection) with the same authority',
      'Gather new/missing documents that address the stated rejection reasons',
      'File the Widerspruch in writing, citing the specific legal errors',
      'Authority has 3 months to respond; if denied again, file Klage (lawsuit) at administrative court',
      'Consider an immigration lawyer — success rates are significantly higher with legal representation',
    ],
    preventionTips: [
      'Use anabin.kmk.org to check if your degree is recognized before applying',
      'Always request a gross annual salary figure in your employment offer',
      'Get all foreign-language documents translated by a sworn translator',
      'Check the BAMF document checklist for your specific visa category',
      'Book a pre-appointment consultation with an immigration lawyer',
    ],
  },
  'student-visa': {
    slug: 'student-visa',
    title: 'Student Visa Rejection Reasons',
    visaType: 'Student Visa (§16b AufenthG)',
    legalBasis: '§16b Aufenthaltsgesetz (AufenthG)',
    description:
      'Student visa rejections are less common than work visa rejections, but financial proof and enrollment documentation are frequent sticking points.',
    successRate: 82,
    avgAppealDays: 28,
    reasons: [
      {
        title: 'Insufficient financial proof',
        description: 'Must demonstrate €11,208/year (2026) in a blocked account (Sperrkonto) or via parental support declaration. The amount must be accessible for the full study duration.',
        frequency: 'very common',
      },
      {
        title: 'No university enrollment or conditional acceptance only',
        description: 'Full enrollment confirmation is required. Conditional acceptance letters (Zulassung mit Auflagen) are not sufficient — you need full Zulassung.',
        frequency: 'common',
      },
      {
        title: 'German language requirements not met',
        description: 'Programs taught in German require proof of language proficiency (typically B2 or C1). TestDaF, DSH, or equivalent certificates required.',
        frequency: 'common',
      },
      {
        title: 'No credible study intention (insufficient ties to home country)',
        description: 'Officers may question whether you intend to return after studies. Strong ties to home country (family, property, employment history) help.',
        frequency: 'occasional',
      },
    ],
    appealProcess: [
      'Request written reasons for rejection (Ablehnungsbescheid) if not provided',
      'File Widerspruch within 1 month addressing each stated reason',
      'For financial issues: open a blocked account immediately and re-submit',
      'For enrollment issues: contact the university for a full acceptance letter',
    ],
    preventionTips: [
      'Open a blocked account (Sperrkonto) well in advance — takes 1–2 weeks',
      'Get full enrollment confirmation, not conditional acceptance',
      'Register for a German language test early if your program is German-language',
      'Keep documentation of ties to your home country',
    ],
  },
  'family-reunification': {
    slug: 'family-reunification',
    title: 'Family Reunification Rejection Reasons',
    visaType: 'Family Reunification (§28/§30 AufenthG)',
    legalBasis: '§28 and §30 Aufenthaltsgesetz (AufenthG)',
    description:
      'Family reunification applications have some of the longest processing times in Germany and face rejections for documentation and language requirement issues.',
    successRate: 71,
    avgAppealDays: 65,
    reasons: [
      {
        title: 'Insufficient living space',
        description: 'The sponsor must have adequate housing. Generally: at least 12 m² per person. A studio apartment with 2 residents may be insufficient for adding a 3rd.',
        frequency: 'very common',
      },
      {
        title: 'German language requirement not met',
        description: 'Spouse joining must demonstrate basic German (A1 level) before entry, unless the sponsor holds a Blue Card or other exemptions apply.',
        frequency: 'very common',
      },
      {
        title: 'Sponsor\'s income insufficient',
        description: 'Sponsor must earn enough to support the family without public assistance. Rough guideline: €2,000+ net/month for a couple (varies by Bundesland).',
        frequency: 'common',
      },
      {
        title: 'Relationship not sufficiently documented',
        description: 'Marriage certificate and proof of genuine relationship required. Officers may request photos, communication records, or prior visits documented.',
        frequency: 'occasional',
      },
    ],
    appealProcess: [
      'File Widerspruch within 1 month of written rejection',
      'Language requirement: enroll in German A1 course immediately',
      'Income: provide updated payslips or employer confirmation of permanent employment',
      'Housing: find larger accommodation and provide new lease agreement',
      'Administrative court appeals have 3–6 month timelines',
    ],
    preventionTips: [
      'Sponsor: enroll spouse in German A1 course 6 months before applying',
      'Ensure your apartment meets minimum space requirements',
      'Collect proof of relationship: photos, travel records, communication history',
      'Check income requirements for your specific Bundesland',
    ],
  },
  freelance: {
    slug: 'freelance',
    title: 'Freelance Visa Rejection Reasons',
    visaType: 'Freelance Visa (§21 AufenthG)',
    legalBasis: '§21 Aufenthaltsgesetz (AufenthG)',
    description:
      'Freelance visa (§21 AufenthG) rejections are the most difficult to appeal. The criteria are vague and officers have significant discretion. Pre-application consultation with a lawyer is strongly recommended.',
    successRate: 52,
    avgAppealDays: 58,
    reasons: [
      {
        title: 'Insufficient or non-binding client contracts',
        description: 'Signed contracts with projected income are required. Letters of intent are insufficient. Officers require binding contracts showing €50,000+ annual projected income.',
        frequency: 'very common',
      },
      {
        title: 'No professional qualifications or portfolio',
        description: 'Must demonstrate professional expertise in the freelance field. University degree, portfolio, professional certifications, or equivalent work history required.',
        frequency: 'very common',
      },
      {
        title: 'Economic viability not demonstrated',
        description: 'Business plan must show realistic income projections. Officers assess whether the freelance activity has genuine economic viability in the German market.',
        frequency: 'common',
      },
      {
        title: 'No public interest or economic need',
        description: 'For certain professions, must show that the freelance activity serves a public interest or fills an economic need not met by local workers.',
        frequency: 'common',
      },
      {
        title: 'Missing professional liability insurance',
        description: 'Many professions require Berufshaftpflichtversicherung (professional liability insurance). This must be active or at least quoted at time of application.',
        frequency: 'common',
      },
      {
        title: 'No Steuernummer (tax registration)',
        description: 'Officers may request tax registration proof. The chicken-and-egg problem: you need a visa to register, but need registration for visa. Pre-registration is possible but requires workarounds.',
        frequency: 'occasional',
      },
    ],
    appealProcess: [
      'Request detailed written rejection citing all specific deficiencies',
      'Address each reason with additional documentation',
      'Get more client contracts and have them signed and notarized',
      'Hire an immigration lawyer — freelance appeals have complex legal grounds',
      'Consider Niederlassungserlaubnis route if you\'ve been working legally for 3+ years',
    ],
    preventionTips: [
      'Get at least 3 signed, binding client contracts before applying',
      'Write a detailed business plan with financial projections',
      'Obtain professional liability insurance before your appointment',
      'Bring extensive portfolio documentation of your work',
      'Consult an immigration lawyer — §21 applications benefit most from legal help',
    ],
  },
  settlement: {
    slug: 'settlement',
    title: 'Settlement Permit Rejection Reasons',
    visaType: 'Settlement Permit (§9/§18c AufenthG)',
    legalBasis: '§9 and §18c Aufenthaltsgesetz (AufenthG)',
    description:
      'Settlement permit (Niederlassungserlaubnis) rejections often come after years of legal residence. The stakes are high — carefully verify all requirements before applying.',
    successRate: 77,
    avgAppealDays: 52,
    reasons: [
      {
        title: 'Insufficient German language level',
        description: 'B1 German is required for the general settlement permit (§9). Blue Card holders only need B1 after 33 months (or A1 after 21 months with salary 150% above threshold).',
        frequency: 'very common',
      },
      {
        title: 'Residency requirement not met',
        description: 'Generally 5 years of legal residence required. Absences from Germany can interrupt this period — check the Unterbrechungszeiten rules carefully.',
        frequency: 'common',
      },
      {
        title: 'Pension contributions not verified',
        description: '60 months of pension contributions (or equivalent) required. This includes time in other EU countries. Request a Rentenversicherungsnachweis early.',
        frequency: 'common',
      },
      {
        title: 'No secure livelihood without public assistance',
        description: 'Must demonstrate ability to support yourself and dependents without Bürgergeld, Wohngeld, or other state assistance. Recent job loss can be disqualifying.',
        frequency: 'common',
      },
      {
        title: 'Criminal convictions',
        description: 'Convictions with sentences above certain thresholds can disqualify. A Führungszeugnis (certificate of good conduct) is required.',
        frequency: 'occasional',
      },
    ],
    appealProcess: [
      'Request written rejection with detailed reasons',
      'For language: register for B1 test (Goethe-Institut, TestDaF) immediately',
      'For residency: verify with your Meldebescheinigung history that absences don\'t exceed limits',
      'For pension: obtain a detailed Rentenversicherungsnachweis from Deutsche Rentenversicherung',
      'File Widerspruch within 1 month',
    ],
    preventionTips: [
      'Obtain B1 language certificate (Goethe-Institut) at least 6 months before applying',
      'Request your Rentenversicherungsnachweis 3 months before application',
      'Track all absences from Germany — keep travel records',
      'Apply for Führungszeugnis 4 weeks before the appointment',
      'Ensure stable employment before applying — avoid applying during probation periods',
    ],
  },
};

export async function generateStaticParams() {
  return [
    { slug: 'work-visa' },
    { slug: 'student-visa' },
    { slug: 'family-reunification' },
    { slug: 'freelance' },
    { slug: 'settlement' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cat = CATEGORIES[params.slug];
  if (!cat) return { title: 'Not Found' };
  return {
    title: `${cat.title} – How to Appeal`,
    description: `Common reasons for ${cat.visaType} rejection in Germany and how to appeal. Based on real community reports.`,
  };
}

const FREQUENCY_STYLE: Record<string, { bg: string; color: string }> = {
  'very common': { bg: 'var(--red-light)', color: 'var(--red)' },
  common: { bg: 'var(--yellow-light)', color: 'var(--yellow)' },
  occasional: { bg: 'var(--accent-light)', color: 'var(--accent)' },
};

export default function RejectionReasonsPage({ params }: { params: { slug: string } }) {
  const cat = CATEGORIES[params.slug];

  if (!cat) {
    return (
      <div className="section">
        <div className="section-inner" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h1 className="page-title">Category Not Found</h1>
          <Link href="/" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Rejection Reasons</span>
            <span className="breadcrumb-sep">/</span>
            <span>{cat.title}</span>
          </nav>
          <div className="page-eyebrow">{cat.legalBasis}</div>
          <h1 className="page-title">{cat.title}</h1>
          <p className="page-subtitle">{cat.description}</p>
          <div className="page-meta">
            <span className="page-meta-item">✓ Appeal success rate: {cat.successRate}%</span>
            <span className="page-meta-item">⏱ Avg. appeal time: {cat.avgAppealDays} days</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <UpdateBanner lastUpdated="May 27, 2026" newReports={2} />

          {/* Reasons */}
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '28px',
              marginBottom: '24px',
              marginTop: '24px',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: '20px',
              }}
            >
              Common Rejection Reasons
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cat.reasons.map((reason) => {
                const freqStyle = FREQUENCY_STYLE[reason.frequency];
                return (
                  <div
                    key={reason.title}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '16px 20px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '12px',
                        marginBottom: '8px',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--ink)',
                        }}
                      >
                        {reason.title}
                      </div>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          padding: '3px 8px',
                          borderRadius: '20px',
                          whiteSpace: 'nowrap',
                          background: freqStyle.bg,
                          color: freqStyle.color,
                          flexShrink: 0,
                        }}
                      >
                        {reason.frequency}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                      {reason.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '32px',
            }}
          >
            {/* Appeal Process */}
            <div
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '16px',
                }}
              >
                How to Appeal
              </h2>
              <div className="checklist">
                {cat.appealProcess.map((step, i) => (
                  <div key={i} className="checklist-item">
                    <span
                      className="checklist-item-icon"
                      style={{
                        background: 'var(--accent)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.6875rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention Tips */}
            <div
              style={{
                background: 'var(--accent-light)',
                border: '1px solid #C5DDD8',
                borderRadius: 'var(--radius-lg)',
                padding: '28px',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  marginBottom: '16px',
                }}
              >
                Prevention Tips
              </h2>
              <div className="checklist">
                {cat.preventionTips.map((tip) => (
                  <div key={tip} className="checklist-item" style={{ background: 'white' }}>
                    <span className="checklist-item-icon">✓</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="alert alert-warning" style={{ marginBottom: '32px' }}>
            <span className="alert-icon">⚠️</span>
            <p className="alert-text">
              <strong>Appeal deadlines are strict.</strong> You typically have 1 month (Widerspruch) or
              1 month (Klage) after receiving a rejection. Missing these deadlines forfeits your right
              to appeal. Consult an immigration lawyer immediately upon receiving a rejection.
            </p>
          </div>

          <ReportForm />
        </div>
      </section>
    </>
  );
}
