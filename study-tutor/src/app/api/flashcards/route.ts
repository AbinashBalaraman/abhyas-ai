import { NextResponse } from 'next/server';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const FLASHCARDS_DATA: Flashcard[] = [
  // Quantitative Aptitude
  {
    id: 'q1',
    front: 'What is the divisibility rule for 11?',
    back: 'The difference between the sum of digits in odd places and even places must be 0 or a multiple of 11 (e.g. 1331: (1+3)-(3+1) = 0).',
    subject: 'Quantitative Aptitude',
    difficulty: 'Easy'
  },
  {
    id: 'q2',
    front: 'What is the relation between HCF, LCM, and two numbers a and b?',
    back: 'HCF(a, b) × LCM(a, b) = a × b. This holds true for any two positive integers.',
    subject: 'Quantitative Aptitude',
    difficulty: 'Easy'
  },
  {
    id: 'q3',
    front: 'What is the percentage equivalent of the fraction 1/8?',
    back: '12.5%. (1/16 is 6.25% and 1/4 is 25%).',
    subject: 'Quantitative Aptitude',
    difficulty: 'Easy'
  },
  {
    id: 'q4',
    front: 'Write the expansion for the algebraic identity: a³ + b³.',
    back: '(a + b)(a² - ab + b²).',
    subject: 'Quantitative Aptitude',
    difficulty: 'Medium'
  },
  {
    id: 'q5',
    front: 'What is the volume of a right circular cone?',
    back: 'V = (1/3) × π × r² × h, where r is radius and h is height.',
    subject: 'Quantitative Aptitude',
    difficulty: 'Medium'
  },

  // Reasoning Ability
  {
    id: 'r1',
    front: 'What is the positional value of letter T in English alphabetical order?',
    back: '20. Remember EJOTY where E=5, J=10, O=15, T=20, Y=25.',
    subject: 'Reasoning Ability',
    difficulty: 'Easy'
  },
  {
    id: 'r2',
    front: 'In syllogisms, what does the statement "Only A are B" translate to?',
    back: 'It translates to "All B are A", meaning B cannot belong to any other group except A.',
    subject: 'Reasoning Ability',
    difficulty: 'Hard'
  },
  {
    id: 'r3',
    front: 'What is the angle between the hour hand and minute hand at 3:40?',
    back: 'Formula: |(30H - 11/2 M)| = |(30×3 - 11/2 × 40)| = |90 - 220| = 130 degrees.',
    subject: 'Reasoning Ability',
    difficulty: 'Hard'
  },

  // General Science
  {
    id: 's1',
    front: "State Newton's Second Law of Motion.",
    back: 'Force = Mass × Acceleration (F = ma). The rate of change of momentum is proportional to the applied force.',
    subject: 'General Science',
    difficulty: 'Easy'
  },
  {
    id: 's2',
    front: 'What is the chemical name and formula of Baking Soda?',
    back: 'Sodium Bicarbonate, NaHCO₃.',
    subject: 'General Science',
    difficulty: 'Medium'
  },
  {
    id: 's3',
    front: 'Which cell organelle is known as the "Powerhouse of the Cell"?',
    back: 'Mitochondria. It is responsible for cellular respiration and ATP generation.',
    subject: 'General Science',
    difficulty: 'Easy'
  },

  // English Language
  {
    id: 'e1',
    front: 'What is the difference between "Its" and "It\'s"?',
    back: '"Its" is a possessive pronoun indicating ownership. "It\'s" is a contraction for "It is" or "It has".',
    subject: 'English Language',
    difficulty: 'Easy'
  },
  {
    id: 'e2',
    front: 'Identify the error rule: "One of the students have done this task."',
    back: '"One of" is followed by a plural noun but a singular verb. The correct sentence is: "One of the students has done this task."',
    subject: 'English Language',
    difficulty: 'Medium'
  },

  // Banking Awareness
  {
    id: 'b1',
    front: 'What is Repo Rate?',
    back: 'The rate at which the Reserve Bank of India (RBI) lends money to commercial banks in the event of any shortfall of funds.',
    subject: 'Banking & Financial Awareness',
    difficulty: 'Easy'
  },
  {
    id: 'b2',
    front: 'What is the difference between SLR and CRR?',
    back: 'CRR (Cash Reserve Ratio) must be kept with RBI in cash. SLR (Statutory Liquidity Ratio) is maintained by banks themselves in liquid assets like gold or government bonds.',
    subject: 'Banking & Financial Awareness',
    difficulty: 'Medium'
  },

  // Computer Aptitude
  {
    id: 'c1',
    front: 'What is the main difference between RAM and ROM?',
    back: 'RAM (Random Access Memory) is volatile (cleared when powered off) and read-write. ROM (Read Only Memory) is non-volatile and generally read-only.',
    subject: 'Computer Aptitude',
    difficulty: 'Easy'
  },
  {
    id: 'c2',
    front: 'Which layer of the OSI model does routing take place in?',
    back: 'Network Layer (Layer 3), where IP addressing and packets are handled.',
    subject: 'Computer Aptitude',
    difficulty: 'Medium'
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');

  try {
    let filtered = FLASHCARDS_DATA;
    if (subject && subject !== 'All') {
      filtered = FLASHCARDS_DATA.filter(card => card.subject.toLowerCase() === subject.toLowerCase() || card.subject.toLowerCase().includes(subject.toLowerCase()));
    }
    
    return NextResponse.json({ flashcards: filtered });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to load flashcards: " + error.message },
      { status: 500 }
    );
  }
}
export const dynamic = 'force-dynamic';
