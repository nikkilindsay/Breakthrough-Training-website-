export const schoolData = {
  name: 'Breakthrough Training Institute',
  tagline: 'Empowering Healthcare Professionals',
  description: 'Breakthrough Training Institute offers comprehensive, professional healthcare training programs designed to prepare students for successful careers in healthcare.',
  address: '11862 Lackland Rd, Suite BTI, St. Louis, MO 63146',
  phone: '636-242-5722',
  email: 'admissions@btieducation.com',
  website: 'https://breakthroughtraining.com',
  logo: '/logo.png',
};

export const programs = [
  {
    id: 'cna',
    name: 'Certified Nursing Assistant (CNA)',
    shortDescription: 'Self-Paced CNA Certification — St. Louis, MO',
    fullDescription: 'Our state-approved self-paced CNA program lets you complete the theory portion entirely online — at the pace of a snail or the pace of lightning, the choice is yours. Finish within 4 months from anywhere in Missouri. Clinical hours are completed separately at a facility of your choice. Perfect for working adults in St. Louis looking to start a healthcare career.',
    duration: 'Flexible',
    price: 475,
    access: '14 weeks',
    features: [
      '100% online classroom theory',
      'Go at your own pace',
      'Complete within 4 months',
      'Clinicals are separate and can be completed at your facility of choice',
      'Comprehensive video tutorials',
      'Interactive study guides',
      'Practice quizzes and assessments'
    ],
    clinicalHours: '100+ hours',
    stateTest: 'Included',
    image: '/programs/cna.jpg',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'cna-hybrid',
    name: 'CNA Hybrid Program',
    shortDescription: 'Next Class Starts July 28, 2026 — Limited Seats!',
    fullDescription: 'Our 5-week CNA Hybrid Program in St. Louis starts with 2 days of in-person classroom instruction to kick off your cohort, then the remainder of your theory classes are completed online. After theory, you\'ll complete 100+ hours of supervised clinical practice. This is the fastest path to CNA certification in Missouri. New cohorts start every 4th Tuesday — next cohort starts July 28, 2026. Enroll now before seats fill up!',
    duration: '5 weeks',
    price: 1175,
    access: 'Full program',
    features: [
      'In-person orientation & instruction (first 2 days)',
      'Remaining theory classes completed online',
      'New cohorts start every 4th Tuesday',
      'Supervised clinical practice',
      'Direct instructor feedback',
      'Networking with peers',
      'Job placement assistance'
    ],
    clinicalHours: '100+ hours',
    stateTest: 'Included',
    image: '/programs/hybrid.jpg',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'cna-clinical',
    name: 'CNA Clinical Experience Only',
    shortDescription: 'Already Completed CNA Theory? Finish Your Clinicals Here',
    fullDescription: 'Already completed your CNA classroom training or theory portion? This program is designed for you. Complete your required 100+ supervised clinical hours at local St. Louis healthcare facilities, prepare for your Missouri state certification exam, and earn your CNA certificate. Note: the CNA certificate is issued only after successfully completing clinicals and passing the state test.',
    duration: 'Variable',
    price: 915,
    access: 'Based on facility',
    features: [
      '100+ hours of supervised clinical practice',
      'Local nursing facility placements',
      'State test preparation',
      'Clinical skills assessment',
      'Professional mentorship',
      'Flexible scheduling',
      'Comprehensive state test review'
    ],
    clinicalHours: '100+ hours',
    stateTest: 'Included',
    image: '/programs/clinical.jpg',
    color: 'from-green-500 to-green-600'
  }
];

export const instructors = [
  {
    id: 'shanekia',
    name: 'Shanekia "Nikki" Lindsay, RN, BSN, MBA',
    title: 'Founder, Program Director & Lead Instructor',
    bio: 'Shanekia "Nikki" Lindsay, RN, BSN, MBA, is the visionary founder and Program Director of Breakthrough Training Institute. A Registered Nurse with 28+ years of healthcare experience, she is a serial entrepreneur, author, and inventor who is currently pursuing her Nurse Practitioner (NP) degree. Nikki combines bedside expertise with business leadership to prepare the next generation of healthcare professionals — and to prove that every student is capable of a breakthrough.',
    credentials: [
      'Registered Nurse (RN)',
      'Bachelor of Science in Nursing (BSN)',
      'Master of Business Administration (MBA)',
      'Nurse Practitioner (NP) — currently in progress',
      '28+ Years of Healthcare Experience',
      'Serial Entrepreneur, Author & Inventor'
    ],
    image: '/shanekia-lindsay.png',
    email: 'admissions@btieducation.com'
  }
];

export const blogPosts = [
  {
    id: 1,
    title: 'Why Choose a CNA Career in 2026?',
    excerpt: 'Discover the rewarding opportunities and career growth potential in nursing assistance.',
    content: 'Certified Nursing Assistants play a vital role in healthcare settings. With an aging population and growing healthcare demands, CNAs are more needed than ever. This career offers flexibility, job security, and the opportunity to make a real difference in patients\' lives.',
    author: 'Shanekia Lindsay',
    date: '2026-06-02',
    category: 'Career',
    image: '/blog/cna-career.jpg'
  },
  {
    id: 2,
    title: 'Essential Skills Every CNA Must Master',
    excerpt: 'Learn the critical competencies that make a successful Certified Nursing Assistant.',
    content: 'From patient hygiene to vital signs monitoring, CNAs must master a diverse set of skills. Our comprehensive training program covers all essential competencies needed for success in clinical settings.',
    author: 'Shanekia Lindsay',
    date: '2026-06-09',
    category: 'Training',
    image: '/blog/cna-skills.jpg'
  },
  {
    id: 3,
    title: 'Patient Communication: The Heart of Healthcare',
    excerpt: 'Master the communication techniques that build trust and improve patient outcomes.',
    content: 'Effective communication is fundamental to quality patient care. Learn how to communicate with empathy, clarity, and professionalism in our specialized training modules.',
    author: 'Shanekia Lindsay',
    date: '2026-06-16',
    category: 'Professional Development',
    image: '/blog/communication.jpg'
  },
  {
    id: 4,
    title: 'Why 2026 is Your Year to Start a CNA Career',
    excerpt: 'The healthcare industry is booming, and CNAs are in high demand. Discover why now is the perfect time to launch your healthcare career.',
    content: 'The healthcare industry is experiencing unprecedented growth, and Certified Nursing Assistants (CNAs) are more in demand than ever.',
    author: 'Shanekia Lindsay',
    date: '2026-06-02',
    category: 'Career',
    image: '/blog/year-2026.jpg'
  },
  {
    id: 5,
    title: 'How to Pass the CNA Certification Exam: 5 Expert Tips',
    excerpt: 'Nervous about the state certification exam? Here are 5 proven strategies to help you pass on your first attempt.',
    content: 'The CNA certification exam can feel intimidating, but with the right preparation, you can pass with confidence.',
    author: 'Shanekia Lindsay',
    date: '2026-06-09',
    category: 'Training',
    image: '/blog/exam-prep.jpg'
  },
  {
    id: 6,
    title: 'A Day in the Life of a Certified Nursing Assistant',
    excerpt: 'Ever wonder what CNAs actually do? Take a peek into a typical day and discover if this career is right for you.',
    content: 'Curious about what it is really like to work as a CNA? Let us follow Maria, one of our graduates, through a typical day.',
    author: 'Shanekia Lindsay',
    date: '2026-06-16',
    category: 'Career',
    image: '/blog/day-in-life.jpg'
  },
  {
    id: 7,
    title: 'The Essential Skills Every CNA Must Master',
    excerpt: 'From patient hygiene to vital signs monitoring, here are the core competencies that make a successful CNA.',
    content: 'Becoming a Certified Nursing Assistant requires mastering a diverse set of clinical and interpersonal skills.',
    author: 'Shanekia Lindsay',
    date: '2026-06-23',
    category: 'Training',
    image: '/blog/essential-skills.jpg'
  },
  {
    id: 8,
    title: 'From CNA to Leadership: Your Healthcare Career Path',
    excerpt: 'Your CNA certification is just the beginning. Discover the exciting career advancement opportunities available to you.',
    content: 'Many people view a CNA certification as an endpoint. In reality, it is a powerful launching pad for an exciting healthcare career.',
    author: 'Shanekia Lindsay',
    date: '2026-06-30',
    category: 'Career',
    image: '/blog/career-path.jpg'
  },
  {
    id: 9,
    title: '5 Reasons to Choose Breakthrough Training Institute',
    excerpt: 'Why our CNA program stands out from the competition and why thousands of students choose us.',
    content: 'With so many CNA programs available, why should you choose Breakthrough Training Institute? Here are 5 compelling reasons.',
    author: 'Shanekia Lindsay',
    date: '2026-07-07',
    category: 'Career',
    image: '/blog/why-choose-us.jpg'
  }
];

export const events = [
  {
    id: 1,
    title: 'CNA Program Orientation',
    date: '2024-02-15',
    time: '10:00 AM',
    location: '11862 Lackland Rd, Suite BTI, St. Louis, MO 63146',
    description: 'Join us for an orientation session to learn about our CNA program, meet instructors, and ask questions.',
    type: 'Orientation',
    capacity: 20
  },
  {
    id: 2,
    title: 'Clinical Skills Workshop',
    date: '2024-02-20',
    time: '2:00 PM',
    location: '11862 Lackland Rd, Suite BTI, St. Louis, MO 63146',
    description: 'Hands-on workshop covering essential clinical skills and best practices.',
    type: 'Workshop',
    capacity: 15
  },
  {
    id: 3,
    title: 'State Exam Preparation Seminar',
    date: '2024-02-28',
    time: '6:00 PM',
    location: '11862 Lackland Rd, Suite BTI, St. Louis, MO 63146',
    description: 'Comprehensive review and preparation for the state certification exam.',
    type: 'Seminar',
    capacity: 25
  },
  {
    id: 4,
    title: 'Graduation Ceremony',
    date: '2024-03-15',
    time: '5:00 PM',
    location: '11862 Lackland Rd, Suite BTI, St. Louis, MO 63146',
    description: 'Celebrate our graduates\' achievements and accomplishments.',
    type: 'Graduation',
    capacity: 100
  }
];

export const galleryItems = [
  {
    id: 1,
    title: 'Graduation Ceremony 2023',
    category: 'Graduation',
    image: '/gallery/graduation-1.jpg',
    description: 'Our proud graduates celebrating their achievements'
  },
  {
    id: 2,
    title: 'Clinical Training Session',
    category: 'Training',
    image: '/gallery/training-1.jpg',
    description: 'Students practicing clinical skills under professional supervision'
  },
  {
    id: 3,
    title: 'Student Success Stories',
    category: 'Students',
    image: '/gallery/students-1.jpg',
    description: 'Meet our accomplished students'
  },
  {
    id: 4,
    title: 'Classroom Learning',
    category: 'Classroom',
    image: '/gallery/classroom-1.jpg',
    description: 'Interactive classroom sessions'
  },
  {
    id: 5,
    title: 'Skills Workshop',
    category: 'Workshop',
    image: '/gallery/workshop-1.jpg',
    description: 'Hands-on skills development'
  },
  {
    id: 6,
    title: 'Graduation Class 2024',
    category: 'Graduation',
    image: '/gallery/graduation-2.jpg',
    description: 'Our latest cohort of certified professionals'
  }
];
