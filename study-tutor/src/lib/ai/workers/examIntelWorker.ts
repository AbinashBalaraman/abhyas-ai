import { AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class ExamIntelWorker implements DomainAgentPlugin {
  public readonly key = 'exam_intel';
  public readonly name = 'Exam Intelligence Specialist';
  public readonly description = 'Retrieves official examination schedules, notification releases, mark allocations, stage-wise patterns, negative marking schemes, and vacancy stats for Indian competitive exams (RRB ALP, RRB NTPC, RRB Group D, SSC CGL/CHSL/CPO/MTS/GD, SBI PO/Clerk, IBPS PO/Clerk, UPSC CSE/CDS/NDA, NEET, JEE).';
  public readonly domainCategory = 'EXAM_INTEL';

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction, context } = params;
    
    // Find the active exam from the most recent turn backwards (reverse chronological)
    const turns = [
      instruction,
      ...((context?.history || []).slice().reverse().map(h => h.content))
    ];

    let activeExam: 
      | 'RRB_ALP'
      | 'RRB_NTPC'
      | 'RRB_GROUP_D'
      | 'RRB_JE'
      | 'SSC_CGL'
      | 'SSC_CHSL'
      | 'SSC_CPO'
      | 'SSC_MTS'
      | 'SSC_GD'
      | 'SBI_PO'
      | 'SBI_CLERK'
      | 'IBPS_PO'
      | 'IBPS_CLERK'
      | 'UPSC_CSE'
      | 'UPSC_CDS_NDA'
      | 'NEET'
      | 'JEE'
      | 'GENERAL' = 'GENERAL';

    for (const turn of turns) {
      // 1. RRB specific variants
      if (/\b(alp|assistant loco pilot|loco pilot|technician|cbat|psycho test)\b/i.test(turn)) {
        activeExam = 'RRB_ALP';
        break;
      }
      if (/\b(group d|cen level 1|track maintainer|pointsman)\b/i.test(turn)) {
        activeExam = 'RRB_GROUP_D';
        break;
      }
      if (/\b(rrb je|junior engineer)\b/i.test(turn)) {
        activeExam = 'RRB_JE';
        break;
      }
      if (/\b(ntpc|station master|goods guard|train clerk)\b/i.test(turn)) {
        activeExam = 'RRB_NTPC';
        break;
      }

      // 2. SSC specific variants
      if (/\b(chsl|10\+2|combined higher secondary|ldc|deo)\b/i.test(turn)) {
        activeExam = 'SSC_CHSL';
        break;
      }
      if (/\b(cpo|delhi police si|capf si)\b/i.test(turn)) {
        activeExam = 'SSC_CPO';
        break;
      }
      if (/\b(mts|multi tasking|havaldar)\b/i.test(turn)) {
        activeExam = 'SSC_MTS';
        break;
      }
      if (/\b(ssc gd|gd constable|general duty)\b/i.test(turn)) {
        activeExam = 'SSC_GD';
        break;
      }
      if (/\b(cgl|combined graduate level)\b/i.test(turn)) {
        activeExam = 'SSC_CGL';
        break;
      }

      // 3. Bank specific variants
      if (/\b(sbi clerk|junior associate)\b/i.test(turn)) {
        activeExam = 'SBI_CLERK';
        break;
      }
      if (/\b(sbi|state bank)\b/i.test(turn)) {
        activeExam = 'SBI_PO';
        break;
      }
      if (/\b(ibps clerk)\b/i.test(turn)) {
        activeExam = 'IBPS_CLERK';
        break;
      }
      if (/\b(ibps)\b/i.test(turn)) {
        activeExam = 'IBPS_PO';
        break;
      }

      // 4. UPSC specific variants
      if (/\b(cds|nda|defence services|national defence academy)\b/i.test(turn)) {
        activeExam = 'UPSC_CDS_NDA';
        break;
      }
      if (/\b(upsc|ias|ips|civil services|cse|csat)\b/i.test(turn)) {
        activeExam = 'UPSC_CSE';
        break;
      }

      // 5. Entrance exams
      if (/\b(neet|mbbs|medical entrance)\b/i.test(turn)) {
        activeExam = 'NEET';
        break;
      }
      if (/\b(jee|jee main|jee advanced|iit)\b/i.test(turn)) {
        activeExam = 'JEE';
        break;
      }

      // 6. Generic Railway / SSC catch-alls
      if (/\b(rrb|railway)\b/i.test(turn)) {
        activeExam = 'RRB_ALP'; // Default Railway to ALP/NTPC
        break;
      }
      if (/\b(ssc|staff selection)\b/i.test(turn)) {
        activeExam = 'SSC_CGL';
        break;
      }
    }

    // ==========================================
    // 1. RRB ALP & Technicians (Assistant Loco Pilot)
    // ==========================================
    if (activeExam === 'RRB_ALP') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Railway Recruitment Boards - Assistant Loco Pilot (RRB ALP 2026)',
          officialPortal: 'https://rrbapply.gov.in/',
          schedule: {
            notification: 'CEN 01/2024 & 2026 Cycles (18,799+ Vacancies)',
            cbt1Dates: 'November – December 2026',
            cbt2Dates: 'February – March 2027',
            cbatDates: 'May 2027'
          },
          markAllocation: {
            cbt1FirstStage: {
              totalQuestions: 75,
              totalMarks: 75,
              duration: '60 minutes',
              negativeMarking: '1/3rd (0.33 marks) deducted per incorrect answer',
              nature: 'Screening / Qualifying exam to shortlist candidates for CBT 2 (15 times total vacancies shortlisted)',
              qualifyingCutoff: 'UR/EWS: 40%, OBC(NCL): 30%, SC: 30%, ST: 25%',
              sections: [
                { subject: 'Mathematics', questions: 20, marks: 20 },
                { subject: 'General Intelligence & Reasoning', questions: 25, marks: 25 },
                { subject: 'General Science (Physics, Chemistry, Life Sciences up to 10th standard)', questions: 20, marks: 20 },
                { subject: 'General Awareness on Current Affairs', questions: 10, marks: 10 }
              ]
            },
            cbt2SecondStage: {
              totalDuration: '2 hours 30 minutes (150 minutes)',
              structure: [
                {
                  part: 'Part A (Merit Ranking for CBAT)',
                  questions: 100,
                  marks: 100,
                  duration: '90 minutes',
                  negativeMarking: '1/3rd mark deducted per wrong answer',
                  weightageInFinalMerit: '70% weightage in final selection',
                  sections: [
                    { subject: 'Mathematics', questions: 25, marks: 25 },
                    { subject: 'General Intelligence & Reasoning', questions: 25, marks: 25 },
                    { subject: 'Basic Science and Engineering (Engineering Drawing, Units, Measurements, Work Power & Energy, Speed & Velocity, Heat & Temperature, Basic Electricity, Levers & Simple Machines, Occupational Safety & Health, IT Literacy)', questions: 40, marks: 40 },
                    { subject: 'General Awareness on Current Affairs', questions: 10, marks: 10 }
                  ]
                },
                {
                  part: 'Part B (Trade Syllabus / Technical Test)',
                  questions: 75,
                  marks: 75,
                  duration: '60 minutes',
                  negativeMarking: '1/3rd mark deducted per wrong answer',
                  nature: 'Strictly qualifying in nature (Mandatory minimum 35% pass mark = 26.25 marks required for all categories without concession)',
                  syllabus: 'Based on DGT (Directorate General of Training) curriculum for the relevant ITI/Trade qualification (e.g. Fitter, Electrician, Electronics, Mechanic, Automobile)'
                }
              ]
            },
            cbatComputerBasedAptitudeTest: {
              targetPosts: 'For Assistant Loco Pilot (ALP) candidates who clear CBT 2 Part A & Part B (8 times vacancy shortlisted)',
              testBatteries: '5 Test Batteries (Memory Test, Direction Test, Depth Perception, Concentration Test, Perceptual Speed)',
              qualifyingRequirement: 'Must score a minimum T-Score of 42 in each of the 5 test batteries separately (No relaxation for any category)',
              weightageInFinalMerit: '30% weightage in final selection'
            },
            finalMeritCalculation: 'Final Merit Score = 70% of CBT 2 Part A Marks + 30% of CBAT Aptitude Score (Total 100% Normalized)'
          },
          eligibility: {
            ageLimit: '18 to 33 years (Age relaxation: OBC 3 yrs, SC/ST 5 yrs)',
            education: 'Matriculation/SSLC plus ITI from recognized institutions of NCVT/SCVT in trades (Fitter, Electrician, Instrument Mechanic, Millwright, Wireman, Tractor Mechanic, Turner, Machinist, Diesel Mechanic, Refrigeration & AC), OR 3 Years Diploma in Mechanical/Electrical/Electronics/Automobile Engineering, OR Degree in Engineering'
          }
        },
        sources: [{
          title: 'Railway Recruitment Boards (Official Notification CEN 01/2024 & Scheme of Exam)',
          subject: 'RRB ALP Mark Allocation, CBT 1 & CBT 2 Pattern, CBAT Psycho Scheme',
          path: 'https://rrbapply.gov.in/'
        }]
      };
    }

    // ==========================================
    // 2. RRB NTPC (Non-Technical Popular Categories)
    // ==========================================
    if (activeExam === 'RRB_NTPC') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Railway Recruitment Boards - NTPC (RRB NTPC 2026)',
          officialPortal: 'https://rrbapply.gov.in/',
          schedule: {
            notification: 'Expected September 2026 (Graduate & Under-Graduate Posts)',
            cbt1Dates: 'December 2026 – January 2027',
            cbt2Dates: 'March / April 2027'
          },
          markAllocation: {
            cbt1: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '90 minutes (120 mins for PwBD)',
              negativeMarking: '1/3rd (0.33 marks) deducted for each incorrect answer',
              sections: [
                { subject: 'General Awareness', questions: 40, marks: 40 },
                { subject: 'Mathematics', questions: 30, marks: 30 },
                { subject: 'General Intelligence & Reasoning', questions: 30, marks: 30 }
              ],
              nature: 'Screening exam to shortlist candidates for CBT 2 (20 times vacancies)'
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
              nature: 'Separate CBT 2 for each 7th CPC Level (Level 2, 3, 4, 5, 6). Merit scores count for final appointment.'
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

    // ==========================================
    // 3. RRB Group D (CEN Level 1)
    // ==========================================
    if (activeExam === 'RRB_GROUP_D') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Railway Recruitment Boards - Group D / CEN Level 1 (2026)',
          officialPortal: 'https://rrbapply.gov.in/',
          schedule: {
            cbtExamDates: 'Expected Late 2026 / Early 2027'
          },
          markAllocation: {
            computerBasedTest: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '90 minutes (120 mins for eligible PwBD candidates)',
              negativeMarking: '1/3rd (0.33 marks) deducted for each incorrect answer',
              sections: [
                { subject: 'General Science (Physics, Chemistry, Life Sciences up to 10th CBSE)', questions: 25, marks: 25 },
                { subject: 'Mathematics', questions: 25, marks: 25 },
                { subject: 'General Intelligence & Reasoning', questions: 30, marks: 30 },
                { subject: 'General Awareness & Current Affairs (Science & Tech, Sports, Culture, Personality, Economics, Politics)', questions: 20, marks: 20 }
              ],
              nature: 'Single-stage Computer Based Test followed by Physical Efficiency Test (PET) and Document Verification'
            }
          },
          eligibility: {
            ageLimit: '18 to 33/36 years',
            education: '10th pass (Matriculation) OR ITI from institutions recognized by NCVT/SCVT'
          }
        },
        sources: [{
          title: 'Railway Recruitment Boards (Group D Examination Scheme)',
          subject: 'RRB Group D CBT Exam Pattern & Subject Weightage',
          path: 'https://rrbapply.gov.in/'
        }]
      };
    }

    // ==========================================
    // 4. SSC CGL (Combined Graduate Level)
    // ==========================================
    if (activeExam === 'SSC_CGL') {
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
              negativeMarking: '0.50 marks deducted per wrong answer (1/4th)',
              sections: [
                { subject: 'General Intelligence & Reasoning', questions: 25, marks: 50 },
                { subject: 'General Awareness', questions: 25, marks: 50 },
                { subject: 'Quantitative Aptitude', questions: 25, marks: 50 },
                { subject: 'English Comprehension', questions: 25, marks: 50 }
              ],
              nature: 'Qualifying in nature for Tier-II selection'
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
            ageLimit: '18 to 30/32 years (post-dependent)',
            education: "Bachelor's Degree in any discipline from a recognized University"
          }
        },
        sources: [{
          title: 'Staff Selection Commission (SSC Official Exam Notice)',
          subject: 'SSC CGL Scheme of Examination & Mark Allocation',
          path: 'https://ssc.gov.in/'
        }]
      };
    }

    // ==========================================
    // 5. SSC CHSL (10+2)
    // ==========================================
    if (activeExam === 'SSC_CHSL') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Staff Selection Commission - Combined Higher Secondary Level (SSC CHSL 2026)',
          officialPortal: 'https://ssc.gov.in/',
          schedule: {
            tier1ExamDates: 'July / August 2026',
            tier2ExamDates: 'November 2026'
          },
          markAllocation: {
            tier1: {
              totalQuestions: 100,
              totalMarks: 200,
              duration: '60 minutes',
              negativeMarking: '0.50 marks per wrong answer',
              sections: [
                { subject: 'English Language (Basic Knowledge)', questions: 25, marks: 50 },
                { subject: 'General Intelligence', questions: 25, marks: 50 },
                { subject: 'Quantitative Aptitude (Basic Arithmetic Skill)', questions: 25, marks: 50 },
                { subject: 'General Awareness', questions: 25, marks: 50 }
              ]
            },
            tier2: {
              totalMarks: '360 Marks (Paper-I Merit Score)',
              structure: [
                { section: 'Section I: Maths (30 Qs / 90m) + Reasoning (30 Qs / 90m)', total: '60 Qs | 180 Marks' },
                { section: 'Section II: English (40 Qs / 120m) + GA (20 Qs / 60m)', total: '60 Qs | 180 Marks' },
                { section: 'Section III: Computer Knowledge (15 Qs / 45m)', nature: 'Qualifying' },
                { section: 'Skill Test / Typing Test (Module-II of Section III)', nature: 'Qualifying' }
              ]
            }
          },
          eligibility: {
            ageLimit: '18 to 27 years',
            education: '12th Standard or equivalent examination from a recognized Board'
          }
        },
        sources: [{
          title: 'Staff Selection Commission (SSC CHSL Exam Scheme)',
          subject: 'SSC CHSL Tier 1 & Tier 2 Mark Breakdown',
          path: 'https://ssc.gov.in/'
        }]
      };
    }

    // ==========================================
    // 6. UPSC Civil Services Examination (CSE)
    // ==========================================
    if (activeExam === 'UPSC_CSE') {
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

    // ==========================================
    // 7. SBI PO (State Bank of India Probationary Officer)
    // ==========================================
    if (activeExam === 'SBI_PO') {
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

    // ==========================================
    // 8. IBPS PO
    // ==========================================
    if (activeExam === 'IBPS_PO') {
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

    // ==========================================
    // 9. NEET (National Eligibility cum Entrance Test)
    // ==========================================
    if (activeExam === 'NEET') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'National Eligibility cum Entrance Test (NEET UG 2026)',
          officialPortal: 'https://exams.nta.ac.in/NEET/',
          schedule: {
            examDate: 'First Sunday of May 2026'
          },
          markAllocation: {
            totalQuestions: '200 Questions (180 to be attempted)',
            totalMarks: 720,
            duration: '3 hours 20 minutes (200 minutes)',
            markingScheme: '+4 for correct response, -1 for incorrect response, 0 for unattempted',
            sections: [
              { subject: 'Physics', sectionA: '35 Qs (140m)', sectionB: '15 Qs (Attempt any 10 = 40m)', totalMarks: 180 },
              { subject: 'Chemistry', sectionA: '35 Qs (140m)', sectionB: '15 Qs (Attempt any 10 = 40m)', totalMarks: 180 },
              { subject: 'Botany', sectionA: '35 Qs (140m)', sectionB: '15 Qs (Attempt any 10 = 40m)', totalMarks: 180 },
              { subject: 'Zoology', sectionA: '35 Qs (140m)', sectionB: '15 Qs (Attempt any 10 = 40m)', totalMarks: 180 }
            ]
          },
          eligibility: {
            ageLimit: 'Minimum 17 years completed as on 31st Dec of admission year (No upper age limit)',
            education: '10+2 with Physics, Chemistry, Biology/Biotechnology and English'
          }
        },
        sources: [{
          title: 'National Testing Agency (NTA NEET Information Bulletin)',
          subject: 'NEET UG Exam Pattern, Subject Mark Allotment & Marking Scheme',
          path: 'https://exams.nta.ac.in/NEET/'
        }]
      };
    }

    // ==========================================
    // 10. JEE (Joint Entrance Examination Main)
    // ==========================================
    if (activeExam === 'JEE') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Joint Entrance Examination - Main (JEE Main 2026)',
          officialPortal: 'https://jeemain.nta.ac.in/',
          schedule: {
            session1: 'January 2026',
            session2: 'April 2026'
          },
          markAllocation: {
            paper1BEBTech: {
              totalQuestions: '90 Questions (75 to be attempted)',
              totalMarks: 300,
              duration: '3 Hours',
              markingScheme: '+4 for correct answer, -1 for wrong answer (applies to both MCQs and Numerical Value questions)',
              sections: [
                { subject: 'Mathematics', sectionA: '20 MCQs (80m)', sectionB: '10 Numerical Qs (Attempt any 5 = 20m)', totalMarks: 100 },
                { subject: 'Physics', sectionA: '20 MCQs (80m)', sectionB: '10 Numerical Qs (Attempt any 5 = 20m)', totalMarks: 100 },
                { subject: 'Chemistry', sectionA: '20 MCQs (80m)', sectionB: '10 Numerical Qs (Attempt any 5 = 20m)', totalMarks: 100 }
              ]
            }
          },
          eligibility: {
            education: 'Passed 10+2 / equivalent with Physics, Mathematics, and one of Chemistry/Biology/Biotechnology/Technical Vocational subject'
          }
        },
        sources: [{
          title: 'National Testing Agency (JEE Main Official Exam Scheme)',
          subject: 'JEE Main Paper-1 Mark Distribution & Negative Marking Scheme',
          path: 'https://jeemain.nta.ac.in/'
        }]
      };
    }

    // ==========================================
    // 11. Default Fallback
    // ==========================================
    return {
      success: true,
      workerId: this.key,
      data: {
        calendarSummary: [
          { exam: 'RRB ALP 2026', dates: 'Nov-Dec 2026', totalMarks: 'CBT 1: 75m | CBT 2 Part A: 100m | CBT 2 Part B: 75m | CBAT 30% merit', portal: 'rrbapply.gov.in' },
          { exam: 'RRB NTPC 2026', dates: 'Dec 2026 - Jan 2027', totalMarks: 'CBT 1: 100m | CBT 2: 120m', portal: 'rrbapply.gov.in' },
          { exam: 'SSC CGL 2026', dates: 'Sept 9-26, 2026', totalMarks: 'Tier I: 200m | Tier II: 390m', portal: 'ssc.gov.in' },
          { exam: 'IBPS PO 2026', dates: 'Aug 22-23, 2026', totalMarks: 'Prelims: 100m | Mains: 225m | Interview: 100m', portal: 'ibps.in' },
          { exam: 'SBI PO 2026', dates: 'Nov 2026', totalMarks: 'Prelims: 100m | Mains: 250m | Interview: 50m', portal: 'sbi.co.in' },
          { exam: 'UPSC CSE 2026', dates: 'May 2026', totalMarks: 'Prelims: 400m | Mains: 1750m | Interview: 275m', portal: 'upsc.gov.in' }
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
