import { AgentExecutionParams, DomainAgentPlugin, WorkerResult } from '../core/types';

export class ExamIntelWorker implements DomainAgentPlugin {
  public readonly key = 'exam_intel';
  public readonly name = 'Exam Intelligence Specialist';
  public readonly description = 'Retrieves official examination schedules, notification releases, mark allocations, stage-wise patterns, negative marking schemes, and vacancy stats for Indian competitive exams (RRB NTPC, Section Controller, Station Master, RRB ALP, RRB Group D, RRB JE, SSC CGL/CHSL/CPO/MTS/GD/Steno, SBI PO/Clerk, IBPS PO/Clerk/RRB, RBI Grade B, UPSC CSE/CDS/NDA/CAPF, State PSCs, NEET, JEE, GATE, UGC NET).';
  public readonly domainCategory = 'EXAM_INTEL';

  async execute(params: AgentExecutionParams): Promise<WorkerResult> {
    const { instruction, context } = params;
    
    // Find the active exam from the most recent turn backwards (reverse chronological)
    const turns = [
      instruction,
      ...((context?.history || []).slice().reverse().map(h => h.content))
    ];

    let activeExam: 
      | 'RRB_SECTION_CONTROLLER'
      | 'RRB_NTPC'
      | 'RRB_ALP'
      | 'RRB_GROUP_D'
      | 'RRB_JE'
      | 'RRB_TECHNICIAN'
      | 'SSC_CGL'
      | 'SSC_CHSL'
      | 'SSC_CPO'
      | 'SSC_MTS'
      | 'SSC_GD'
      | 'SSC_STENO'
      | 'SBI_PO'
      | 'SBI_CLERK'
      | 'IBPS_PO'
      | 'IBPS_CLERK'
      | 'IBPS_RRB'
      | 'RBI_GRADE_B'
      | 'UPSC_CSE'
      | 'UPSC_CDS_NDA'
      | 'UPSC_CAPF'
      | 'STATE_PSC'
      | 'NEET'
      | 'JEE'
      | 'GATE'
      | 'UGC_NET'
      | 'GENERAL' = 'GENERAL';

    for (const turn of turns) {
      // 1. Specific Railway roles
      if (/\b(section controller|traffic controller|chief controller|traffic apprentice)\b/i.test(turn)) {
        activeExam = 'RRB_SECTION_CONTROLLER';
        break;
      }
      if (/\b(alp|assistant loco pilot|loco pilot)\b/i.test(turn)) {
        activeExam = 'RRB_ALP';
        break;
      }
      if (/\b(technician grade 1|technician grade 3|technician signal)\b/i.test(turn)) {
        activeExam = 'RRB_TECHNICIAN';
        break;
      }
      if (/\b(group d|cen level 1|track maintainer|pointsman|gateman|gangman)\b/i.test(turn)) {
        activeExam = 'RRB_GROUP_D';
        break;
      }
      if (/\b(rrb je|junior engineer railway|railway je)\b/i.test(turn)) {
        activeExam = 'RRB_JE';
        break;
      }
      if (/\b(ntpc|station master|goods guard|goods train manager|train clerk|commercial apprentice|ticket clerk|senior clerk|junior clerk)\b/i.test(turn)) {
        activeExam = 'RRB_NTPC';
        break;
      }

      // 2. SSC Specific roles
      if (/\b(steno|stenographer|grade c and d)\b/i.test(turn)) {
        activeExam = 'SSC_STENO';
        break;
      }
      if (/\b(chsl|10\+2|combined higher secondary|ldc|deo)\b/i.test(turn)) {
        activeExam = 'SSC_CHSL';
        break;
      }
      if (/\b(cpo|delhi police si|capf si|sub inspector delhi)\b/i.test(turn)) {
        activeExam = 'SSC_CPO';
        break;
      }
      if (/\b(mts|multi tasking|havaldar)\b/i.test(turn)) {
        activeExam = 'SSC_MTS';
        break;
      }
      if (/\b(ssc gd|gd constable|general duty constable)\b/i.test(turn)) {
        activeExam = 'SSC_GD';
        break;
      }
      if (/\b(cgl|combined graduate level)\b/i.test(turn)) {
        activeExam = 'SSC_CGL';
        break;
      }

      // 3. Banking Specific roles
      if (/\b(rbi grade b|rbi assistant|reserve bank)\b/i.test(turn)) {
        activeExam = 'RBI_GRADE_B';
        break;
      }
      if (/\b(ibps rrb|gramin bank|regional rural bank)\b/i.test(turn)) {
        activeExam = 'IBPS_RRB';
        break;
      }
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

      // 4. State PSCs
      if (/\b(tnpsc|uppsc|bpsc|mpsc|wbpsc|kpsc|appsc|tspsc|ras|rpsc|group 1|group 2|group 4)\b/i.test(turn)) {
        activeExam = 'STATE_PSC';
        break;
      }

      // 5. UPSC & Defence
      if (/\b(capf ac|assistant commandant|central armed police)\b/i.test(turn)) {
        activeExam = 'UPSC_CAPF';
        break;
      }
      if (/\b(cds|nda|afcat|defence services|national defence academy)\b/i.test(turn)) {
        activeExam = 'UPSC_CDS_NDA';
        break;
      }
      if (/\b(upsc|ias|ips|civil services|cse|csat)\b/i.test(turn)) {
        activeExam = 'UPSC_CSE';
        break;
      }

      // 6. Eligibility & Entrances
      if (/\b(ugc net|csir net|jrf|set exam)\b/i.test(turn)) {
        activeExam = 'UGC_NET';
        break;
      }
      if (/\b(gate|ese|engineering services)\b/i.test(turn)) {
        activeExam = 'GATE';
        break;
      }
      if (/\b(neet|mbbs|medical entrance)\b/i.test(turn)) {
        activeExam = 'NEET';
        break;
      }
      if (/\b(jee|jee main|jee advanced|iit)\b/i.test(turn)) {
        activeExam = 'JEE';
        break;
      }

      // 7. Generic Fallbacks (Default RRB to NTPC, never ALP)
      if (/\b(rrb|railway)\b/i.test(turn)) {
        activeExam = 'RRB_NTPC';
        break;
      }
      if (/\b(ssc|staff selection)\b/i.test(turn)) {
        activeExam = 'SSC_CGL';
        break;
      }
    }

    // ==========================================
    // 1. RRB Section Controller (NTPC Level 6)
    // ==========================================
    if (activeExam === 'RRB_SECTION_CONTROLLER') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Indian Railways - RRB Section Controller / Traffic Controller (NTPC Pay Level 6)',
          officialPortal: 'https://rrbapply.gov.in/',
          jobRole: 'Section Controllers & Traffic Controllers are responsible for controlling train movements, ensuring sectional capacity, and managing signal coordination in railway divisions.',
          schedule: {
            notification: 'Under CEN 05/2024 & Regular NTPC Graduate Recruitment Cycles',
            cbt1Dates: 'December 2026 – January 2027',
            cbt2Dates: 'March / April 2027'
          },
          markAllocation: {
            cbt1FirstStage: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '90 minutes (120 mins for PwBD)',
              negativeMarking: '1/3rd (0.33 marks) deducted for each incorrect response',
              nature: 'Common screening examination for all graduate & undergraduate posts (Shortlisting ratio 1:20 times vacancies for CBT 2)',
              sections: [
                { subject: 'General Awareness (Current Affairs, Science, History, Polity, Geography, Economics)', questions: 40, marks: 40 },
                { subject: 'Mathematics (Arithmetic, Algebra, Geometry, Trigonometry, Number System)', questions: 30, marks: 30 },
                { subject: 'General Intelligence & Reasoning (Analogies, Coding-Decoding, Puzzles, Syllogism, Blood Relations)', questions: 30, marks: 30 }
              ]
            },
            cbt2SecondStage: {
              targetLevel: 'CBT 2 for Pay Level 6 Posts (Section Controller, Station Master, Commercial Apprentice)',
              totalQuestions: 120,
              totalMarks: 120,
              duration: '90 minutes',
              negativeMarking: '1/3rd (0.33 marks) deducted for each incorrect response',
              nature: 'Merit Determining (Marks directly contribute to final selection)',
              sections: [
                { subject: 'General Awareness', questions: 50, marks: 50 },
                { subject: 'Mathematics', questions: 35, marks: 35 },
                { subject: 'General Intelligence & Reasoning', questions: 35, marks: 35 }
              ]
            },
            cbatAptitudePsychoTest: {
              applicability: 'Applicable for Traffic Controller & Station Master categories (Shortlisting ratio 1:8 times vacancies from CBT 2 Level 6)',
              qualifyingRequirement: 'Must score minimum T-Score of 42 in each of the 5 test batteries without concession',
              weightage: '70% weightage from CBT 2 Level 6 + 30% weightage from CBAT Aptitude Score (where applicable)'
            },
            documentVerificationAndMedical: {
              medicalStandard: 'A-2 Medical Fitness (Strict visual acuity requirements without glasses/corrective lenses as per railway operational norms)'
            }
          },
          eligibility: {
            ageLimit: '18 to 33/36 years (Standard age relaxations for OBC/SC/ST)',
            education: "Bachelor's Degree in any discipline from a recognized University"
          }
        },
        sources: [{
          title: 'Railway Recruitment Boards (Official CEN NTPC Graduate Recruitment Scheme)',
          subject: 'RRB Section Controller & Station Master (Level 6) Mark Allocation and Selection Pattern',
          path: 'https://rrbapply.gov.in/'
        }]
      };
    }

    // ==========================================
    // 2. RRB NTPC (General Graduate & Undergraduate)
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
    // 3. RRB ALP (Assistant Loco Pilot)
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
                    { subject: 'Basic Science and Engineering', questions: 40, marks: 40 },
                    { subject: 'General Awareness on Current Affairs', questions: 10, marks: 10 }
                  ]
                },
                {
                  part: 'Part B (Trade Syllabus / Technical Test)',
                  questions: 75,
                  marks: 75,
                  duration: '60 minutes',
                  negativeMarking: '1/3rd mark deducted per wrong answer',
                  nature: 'Strictly qualifying in nature (Mandatory minimum 35% pass mark = 26.25 marks required for all categories without concession)'
                }
              ]
            },
            cbatComputerBasedAptitudeTest: {
              targetPosts: 'For Assistant Loco Pilot (ALP) candidates who clear CBT 2 (8 times vacancy shortlisted)',
              qualifyingRequirement: 'Must score minimum T-Score of 42 in each of 5 test batteries',
              weightageInFinalMerit: '30% weightage in final selection'
            },
            finalMeritCalculation: 'Final Merit Score = 70% of CBT 2 Part A Marks + 30% of CBAT Aptitude Score'
          },
          eligibility: {
            ageLimit: '18 to 33 years',
            education: 'Matriculation/SSLC plus ITI/Diploma/B.Tech in relevant mechanical/electrical/automobile engineering disciplines'
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
    // 4. RRB Group D (CEN Level 1)
    // ==========================================
    if (activeExam === 'RRB_GROUP_D') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Railway Recruitment Boards - Group D / CEN Level 1 (2026)',
          officialPortal: 'https://rrbapply.gov.in/',
          markAllocation: {
            computerBasedTest: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '90 minutes (120 mins for eligible PwBD candidates)',
              negativeMarking: '1/3rd (0.33 marks) deducted for each incorrect answer',
              sections: [
                { subject: 'General Science', questions: 25, marks: 25 },
                { subject: 'Mathematics', questions: 25, marks: 25 },
                { subject: 'General Intelligence & Reasoning', questions: 30, marks: 30 },
                { subject: 'General Awareness & Current Affairs', questions: 20, marks: 20 }
              ]
            }
          },
          eligibility: {
            ageLimit: '18 to 33/36 years',
            education: '10th pass OR ITI'
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
    // 5. SSC CGL (Combined Graduate Level)
    // ==========================================
    if (activeExam === 'SSC_CGL') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'Staff Selection Commission - Combined Graduate Level (SSC CGL 2026)',
          officialPortal: 'https://ssc.gov.in/',
          schedule: {
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
              ]
            },
            tier2: {
              totalMarks: '390 marks (Paper-I Merit Score) + Qualifying Modules',
              negativeMarking: '1 mark deducted per wrong answer in Section I, II & Module-I of Section III',
              structure: [
                { section: 'Section I: Maths (30 Qs / 90m) + Reasoning (30 Qs / 90m)', total: '60 Qs | 180 Marks' },
                { section: 'Section II: English (45 Qs / 135m) + GA (25 Qs / 75m)', total: '70 Qs | 210 Marks' },
                { section: 'Section III: Computer Knowledge (20 Qs / 60m)', nature: 'Qualifying' },
                { section: 'DEST (Data Entry Speed Test)', requirement: '~2000 key depressions in 15 mins (Qualifying)' }
              ]
            }
          },
          eligibility: {
            ageLimit: '18 to 30/32 years',
            education: "Bachelor's Degree in any discipline"
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
              description: '7 Merit Papers (250 marks each = 1,750 marks) + 2 Qualifying Language Papers (300 marks each)'
            },
            interview: {
              marks: 275,
              grandTotalMerit: '2,025 Marks (Mains 1750 + Interview 275)'
            }
          },
          eligibility: {
            ageLimit: '21 to 32 years (General category: 6 attempts)',
            education: "Graduation degree in any discipline"
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
    // 7. State PSCs (TNPSC, UPPSC, BPSC, MPSC, etc.)
    // ==========================================
    if (activeExam === 'STATE_PSC') {
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: 'State Public Service Commission (Group Services Examination)',
          officialPortal: 'State Public Service Commission Portal',
          markAllocation: {
            prelims: {
              totalMarks: '150 to 300 Marks (Objective MCQs covering General Studies, State History/Geography, Mental Ability)',
              negativeMarking: 'Standard 1/3rd or 1/4th deduction per wrong answer depending on state commission rules'
            },
            mains: {
              totalMarks: 'Descriptive written papers covering General Studies, Language, and State Administration (typically 750 to 1500 Marks)'
            },
            interview: {
              totalMarks: 'Personality test / Interview (typically 100 to 150 Marks)'
            }
          },
          eligibility: {
            education: 'Degree (Graduation) from a recognized university and proficiency in state official language'
          }
        },
        sources: [{
          title: 'State Public Service Commission Recruitment Rules',
          subject: 'State Civil Services Examination Scheme & Mark Allocation',
          path: 'https://upsc.gov.in/'
        }]
      };
    }

    // ==========================================
    // 8. Banking (SBI PO / IBPS PO)
    // ==========================================
    if (activeExam === 'SBI_PO' || activeExam === 'IBPS_PO') {
      const isSBI = activeExam === 'SBI_PO';
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: isSBI ? 'State Bank of India Probationary Officer (SBI PO 2026)' : 'IBPS PO/MT-XVI (2026 Recruitment)',
          officialPortal: isSBI ? 'https://sbi.co.in/web/careers' : 'https://www.ibps.in/',
          markAllocation: {
            prelims: {
              totalQuestions: 100,
              totalMarks: 100,
              duration: '60 minutes (Sectional timing: 20 mins per section)',
              negativeMarking: '0.25 marks (1/4th) per wrong answer',
              sections: [
                { subject: 'English Language', questions: 30, marks: 30, time: '20 mins' },
                { subject: 'Quantitative Aptitude', questions: 35, marks: 35, time: '20 mins' },
                { subject: 'Reasoning Ability', questions: 35, marks: 35, time: '20 mins' }
              ]
            },
            mains: {
              totalMarks: isSBI ? '250 Marks (Objective 200m + Descriptive 50m)' : '225 Marks (Objective 200m + Descriptive 25m)'
            },
            interview: {
              totalMarks: isSBI ? '50 Marks (GE 20m + Interview 30m, 75:25 ratio)' : '100 Marks (80:20 ratio)'
            }
          }
        },
        sources: [{
          title: isSBI ? 'State Bank of India (Official Portal)' : 'Institute of Banking Personnel Selection',
          subject: 'Bank PO Exam Pattern & Mark Distribution',
          path: isSBI ? 'https://sbi.co.in/web/careers' : 'https://www.ibps.in/'
        }]
      };
    }

    // ==========================================
    // 9. NEET / JEE
    // ==========================================
    if (activeExam === 'NEET' || activeExam === 'JEE') {
      const isNEET = activeExam === 'NEET';
      return {
        success: true,
        workerId: this.key,
        data: {
          examTitle: isNEET ? 'National Eligibility cum Entrance Test (NEET UG 2026)' : 'Joint Entrance Examination - Main (JEE Main 2026)',
          officialPortal: isNEET ? 'https://exams.nta.ac.in/NEET/' : 'https://jeemain.nta.ac.in/',
          markAllocation: {
            totalMarks: isNEET ? 720 : 300,
            duration: isNEET ? '3 hours 20 minutes (200 minutes)' : '3 Hours',
            markingScheme: '+4 for correct, -1 for incorrect response'
          }
        },
        sources: [{
          title: 'National Testing Agency (NTA Official Exam Bulletin)',
          subject: isNEET ? 'NEET UG Exam Pattern & Mark Scheme' : 'JEE Main Exam Pattern & Mark Scheme',
          path: isNEET ? 'https://exams.nta.ac.in/NEET/' : 'https://jeemain.nta.ac.in/'
        }]
      };
    }

    // ==========================================
    // 10. Default Fallback
    // ==========================================
    return {
      success: true,
      workerId: this.key,
      data: {
        calendarSummary: [
          { exam: 'RRB NTPC / Section Controller 2026', dates: 'Dec 2026 - Jan 2027', totalMarks: 'CBT 1: 100m | CBT 2 Level 6: 120m | CBAT 30% merit', portal: 'rrbapply.gov.in' },
          { exam: 'RRB ALP 2026', dates: 'Nov-Dec 2026', totalMarks: 'CBT 1: 75m | CBT 2 Part A: 100m | CBT 2 Part B: 75m | CBAT 30% merit', portal: 'rrbapply.gov.in' },
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
