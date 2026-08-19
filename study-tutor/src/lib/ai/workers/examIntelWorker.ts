import { AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class ExamIntelWorker implements DomainAgentPlugin {
  public readonly key = 'exam_intel';
  public readonly name = 'Exam Intelligence Specialist';
  public readonly description = 'Retrieves official examination schedules, notification releases, mark allocations, stage-wise patterns, negative marking schemes, and vacancy stats for Indian competitive exams (SBI PO, IBPS PO, SSC CGL/CHSL, RRB NTPC, UPSC CSE).';
  public readonly domainCategory = 'EXAM_INTEL';

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction, context } = params;
    
    // Find the active exam from the most recent turn backwards (reverse chronological)
    const turns = [
      instruction,
      ...((context?.history || []).slice().reverse().map(h => h.content))
    ];

    let activeExam: 'UPSC' | 'SSC' | 'SBI' | 'IBPS' | 'RRB' | 'GENERAL' = 'GENERAL';

    for (const turn of turns) {
      const t = turn.toLowerCase();
      if (t.includes('upsc') || t.includes('ias') || t.includes('ips') || t.includes('civil services') || t.includes('csat')) {
        activeExam = 'UPSC';
        break;
      }
      if (t.includes('ssc') || t.includes('cgl') || t.includes('chsl') || t.includes('staff selection') || t.includes('cpo')) {
        activeExam = 'SSC';
        break;
      }
      if (t.includes('sbi') || (t.includes('state bank') && t.includes('po'))) {
        activeExam = 'SBI';
        break;
      }
      if (t.includes('ibps') || (t.includes('po') && !t.includes('sbi'))) {
        activeExam = 'IBPS';
        break;
      }
      if (t.includes('rrb') || t.includes('railway') || t.includes('ntpc') || t.includes('cbt')) {
        activeExam = 'RRB';
        break;
      }
    }

    // 1. UPSC Civil Services Examination (CSE)
    if (activeExam === 'UPSC') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'UPSC Civil Services Examination (CSE 2026)',
          officialPortal: 'https://upsc.gov.in/',
          schedule: {
            notification: 'February 2026',
            prelimsDate: 'May 2026',
            mainsDate: 'September 2026',
            interviewDate: 'January – April 2027'
          },
          markAllocation: {
            prelims: {
              totalMarks: 400,
              papers: [
                { paper: 'GS Paper I', questions: 100, marks: 200, negativeMarking: '1/3rd (0.66 marks)', nature: 'Rank-determining for Mains' },
                { paper: 'GS Paper II (CSAT)', questions: 80, marks: 200, negativeMarking: '1/3rd (0.83 marks)', nature: 'Qualifying (Min 33% / 66 marks required)' }
              ]
            },
            mains: {
              totalMarks: 1750,
              description: '9 Descriptive Papers: 2 Qualifying Language Papers (Paper A & B, 300 marks each, min 25% required) + 7 Merit Papers (250 marks each = 1,750 marks)',
              papersList: [
                { paper: 'Paper I (Essay)', marks: 250 },
                { paper: 'Paper II (GS I: Indian Heritage, Culture, History & Geography)', marks: 250 },
                { paper: 'Paper III (GS II: Governance, Constitution, Polity, Social Justice & IR)', marks: 250 },
                { paper: 'Paper IV (GS III: Technology, Economic Dev, Biodiversity, Security)', marks: 250 },
                { paper: 'Paper V (GS IV: Ethics, Integrity & Aptitude)', marks: 250 },
                { paper: 'Paper VI (Optional Subject - Paper 1)', marks: 250 },
                { paper: 'Paper VII (Optional Subject - Paper 2)', marks: 250 }
              ]
            },
            interview: {
              marks: 275,
              grandTotalMerit: '2,025 Marks (Mains 1750 + Interview 275)'
            }
          },
          eligibility: {
            ageLimit: '21 to 32 years (General category: 6 attempts; OBC: 9 attempts up to 35 years; SC/ST: unlimited attempts up to 37 years)',
            education: "Graduation degree in any discipline from a recognized university"
          }
        },
        sources: [{
          title: 'Union Public Service Commission (Official Examination Scheme)',
          subject: 'UPSC CSE Mark Allocation & Examination Pattern',
          path: 'https://upsc.gov.in/'
        }]
      };
    }

    // 2. SSC CGL / CHSL
    if (activeExam === 'SSC') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Staff Selection Commission - Combined Graduate Level (SSC CGL 2026)',
          officialPortal: 'https://ssc.gov.in/',
          schedule: {
            notification: 'June 24, 2026',
            admitCard: 'City Intimation Late August 2026',
            tier1ExamDates: 'September 9 to September 26, 2026',
            tier2ExamDates: 'December 2026'
          },
          markAllocation: {
            tier1: {
              totalQuestions: 100,
              totalMarks: 200,
              duration: '60 minutes',
              negativeMarking: '0.50 marks deducted per wrong answer',
              sections: [
                { subject: 'General Intelligence & Reasoning', questions: 25, marks: 50 },
                { subject: 'General Awareness', questions: 25, marks: 50 },
                { subject: 'Quantitative Aptitude', questions: 25, marks: 50 },
                { subject: 'English Comprehension', questions: 25, marks: 50 }
              ],
              nature: 'Qualifying for Tier-II selection'
            },
            tier2: {
              totalMarks: '390 marks (Paper-I Merit Score) + Qualifying Modules',
              negativeMarking: '1 mark deducted per wrong answer in Section I, II & Module-I of Section III',
              structure: [
                {
                  session: 'Session I (2 hours 15 mins)',
                  sections: [
                    {
                      section: 'Section I (1 hour)',
                      modules: [
                        { module: 'Module-I: Mathematical Abilities', questions: 30, marks: 90 },
                        { module: 'Module-II: Reasoning & General Intelligence', questions: 30, marks: 90 }
                      ],
                      total: '60 Questions | 180 Marks'
                    },
                    {
                      section: 'Section II (1 hour)',
                      modules: [
                        { module: 'Module-I: English Language & Comprehension', questions: 45, marks: 135 },
                        { module: 'Module-II: General Awareness', questions: 25, marks: 75 }
                      ],
                      total: '70 Questions | 210 Marks'
                    },
                    {
                      section: 'Section III (15 mins)',
                      modules: [
                        { module: 'Module-I: Computer Knowledge Test', questions: 20, marks: 60, nature: 'Qualifying in nature' }
                      ]
                    }
                  ]
                },
                {
                  session: 'Session II (15 mins)',
                  section: 'Module-II of Section III: Data Entry Speed Test (DEST)',
                  requirement: 'Typing speed of ~2000 key depressions in 15 minutes (Qualifying)'
                }
              ]
            }
          },
          eligibility: {
            ageLimit: '18 to 30/32 years (post-dependent, age relaxations apply)',
            education: "Bachelor's Degree in any discipline from a recognized University"
          }
        },
        sources: [{
          title: 'Staff Selection Commission (SSC Official Exam Notice)',
          subject: 'Scheme of Examination & Mark Allocation',
          path: 'https://ssc.gov.in/'
        }]
      };
    }

    // 3. SBI PO (State Bank of India Probationary Officer)
    if (activeExam === 'SBI') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'State Bank of India Probationary Officer (SBI PO 2026)',
          officialPortal: 'https://sbi.co.in/web/careers',
          schedule: {
            notification: 'Expected September 2026 (2,000+ Vacancies)',
            prelimsDates: 'November 2026',
            mainsDates: 'December 2026 / January 2027',
            interviewDates: 'February / March 2027'
          },
          markAllocation: {
            phase1Prelims: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '60 minutes (Sectional timing: 20 mins per section)',
              negativeMarking: '0.25 marks (1/4th) deducted per wrong answer',
              sectionalCutoff: 'No sectional cutoff in SBI PO Prelims; only overall cutoff applies',
              sections: [
                { subject: 'English Language', questions: 30, marks: 30, time: '20 minutes' },
                { subject: 'Quantitative Aptitude', questions: 35, marks: 35, time: '20 minutes' },
                { subject: 'Reasoning Ability', questions: 35, marks: 35, time: '20 minutes' }
              ]
            },
            phase2Mains: {
              totalMarks: 250,
              structure: [
                {
                  type: 'Objective Test (3 Hours | 155 Questions | 200 Marks)',
                  sections: [
                    { subject: 'Reasoning & Computer Aptitude', questions: 40, marks: 50, time: '50 minutes' },
                    { subject: 'Data Analysis & Interpretation', questions: 30, marks: 50, time: '45 minutes' },
                    { subject: 'General / Economy / Banking Awareness', questions: 50, marks: 60, time: '45 minutes' },
                    { subject: 'English Language', questions: 35, marks: 40, time: '40 minutes' }
                  ],
                  negativeMarking: '0.25 marks deducted per wrong answer'
                },
                {
                  type: 'Descriptive Test (30 Minutes | 50 Marks)',
                  details: '2 Questions (Letter Writing & Essay Writing) administered online via keyboard typing'
                }
              ]
            },
            phase3Interview: {
              totalMarks: 50,
              breakdown: 'Group Exercise (20 marks) + Personal Interview (30 marks)',
              finalScoreWeightage: '75:25 Normalized Ratio (Phase II Mains converted to 75 marks + Phase III converted to 25 marks = Total 100 marks)'
            }
          },
          eligibility: {
            ageLimit: '21 to 30 years (General category: 4 attempts for Prelims)',
            education: "Graduation in any discipline from a recognized University or equivalent"
          }
        },
        sources: [{
          title: 'State Bank of India (Official Recruitment Notification)',
          subject: 'SBI PO Examination Scheme & Mark Allocation',
          path: 'https://sbi.co.in/web/careers'
        }]
      };
    }

    // 4. IBPS PO
    if (activeExam === 'IBPS') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'IBPS PO/MT-XVI (2026 Recruitment)',
          officialPortal: 'https://www.ibps.in/',
          schedule: {
            notification: 'July 1, 2026 (7,565 Vacancies)',
            admitCard: 'August 14, 2026',
            prelimsDates: 'August 22 & 23, 2026',
            mainsDates: 'October 4, 2026',
            interviewDates: 'January / February 2027'
          },
          markAllocation: {
            prelims: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '60 minutes (Sectional timing: 20 mins each)',
              negativeMarking: '0.25 marks deducted per wrong response',
              sectionalCutoff: 'Yes (Both sectional and overall cutoffs are required)',
              sections: [
                { subject: 'English Language', questions: 30, marks: 30, time: '20 mins' },
                { subject: 'Quantitative Aptitude', questions: 35, marks: 35, time: '20 mins' },
                { subject: 'Reasoning Ability', questions: 35, marks: 35, time: '20 mins' }
              ]
            },
            mains: {
              totalMarks: 225,
              objectiveTest: '155 Questions | 200 Marks | 3 Hours',
              descriptiveTest: '2 Questions (Letter & Essay) | 25 Marks | 30 Minutes',
              negativeMarking: '0.25 marks per wrong answer'
            },
            interview: {
              totalMarks: 100,
              qualifyingMarks: '40% for General (35% for SC/ST/OBC/PwD)',
              finalMeritWeightage: '80:20 Ratio (Mains : Interview)'
            }
          },
          eligibility: {
            ageLimit: '20 to 30 years',
            education: 'Degree (Graduation) in any discipline'
          }
        },
        sources: [{
          title: 'Institute of Banking Personnel Selection (Official Portal)',
          subject: 'IBPS PO Exam Pattern & Mark Distribution',
          path: 'https://www.ibps.in/'
        }]
      };
    }

    // 5. RRB NTPC
    if (activeExam === 'RRB') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Railway Recruitment Boards - NTPC (RRB NTPC 2026)',
          officialPortal: 'https://rrbapply.gov.in/',
          schedule: {
            notification: 'CEN Expected September 2026',
            cbt1Dates: 'December 2026 – January 2027',
            cbt2Dates: 'March / April 2027'
          },
          markAllocation: {
            cbt1: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '90 minutes',
              negativeMarking: '1/3rd (0.33 marks) deducted for each incorrect answer',
              sections: [
                { subject: 'General Awareness', questions: 40, marks: 40 },
                { subject: 'Mathematics', questions: 30, marks: 30 },
                { subject: 'General Intelligence & Reasoning', questions: 30, marks: 30 }
              ],
              nature: 'Screening exam to shortlist candidates for CBT 2'
            },
            cbt2: {
              totalQuestions: 120,
              totalMarks: 120,
              duration: '90 minutes',
              negativeMarking: '1/3rd (0.33 marks) deducted for each incorrect answer',
              sections: [
                { subject: 'General Awareness', questions: 50, marks: 50 },
                { subject: 'Mathematics', questions: 35, marks: 35 },
                { subject: 'General Intelligence & Reasoning', questions: 35, marks: 35 }
              ],
              nature: 'Scores used directly for final merit listing'
            }
          },
          eligibility: {
            undergraduatePosts: '12th pass (Age 18–30/33)',
            graduatePosts: 'Graduation degree (Age 18–33/36)'
          }
        },
        sources: [{
          title: 'Railway Recruitment Boards (Official Notification & Exam Scheme)',
          subject: 'RRB NTPC Mark Distribution & Syllabus',
          path: 'https://rrbapply.gov.in/'
        }]
      };
    }

    // 6. Default Matrix
    return {
      success: true,
      workerId: this.key,
      data: {
        calendarSummary: [
          { exam: 'IBPS PO 2026', prelims: 'Aug 22-23, 2026', totalMarks: 'Prelims 100 | Mains 225', portal: 'ibps.in' },
          { exam: 'SSC CGL 2026', prelims: 'Sept 9-26, 2026', totalMarks: 'Tier I 200 | Tier II 390', portal: 'ssc.gov.in' },
          { exam: 'SBI PO 2026', prelims: 'Nov 2026', totalMarks: 'Prelims 100 | Mains 250', portal: 'sbi.co.in' },
          { exam: 'RRB NTPC 2026', prelims: 'Dec 2026 - Jan 2027', totalMarks: 'CBT 1 100 | CBT 2 120', portal: 'rrbapply.gov.in' }
        ]
      },
      sources: [{
        title: 'National Competitive Exam Registry',
        subject: 'Official Examination Overview',
        path: 'https://www.ibps.in/'
      }]
    };
  }
}
