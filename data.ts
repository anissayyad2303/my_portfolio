export const profile = {
  name: 'Ammara Maner',
  shortName: 'Ammara Maner',
  role: 'Computer Engineering Student',
  institute: 'Sharad Institute of Technology, Polytechnic, Yadrav, Maharashtra, India',
  email: 'your.email@example.com', // Replace with your public professional email.
  github: '', // Add your GitHub profile URL.
  linkedin: '', // Add your LinkedIn profile URL.
  resumePath: '/resume.pdf',
  availabilityLabel: 'Open to internships & opportunities',
  showAvailability: false, // Change to true only when this is accurate.
  graduationYear: 'Add expected graduation year',
}

export const skillGroups = [
  { title: 'Programming', description: 'Languages to add as you learn them', skills: ['Python', 'C', 'C++', 'Java', 'JavaScript'] },
  { title: 'Web development', description: 'Building for the browser', skills: ['HTML5', 'CSS3', 'Responsive design', 'Frontend development'] },
  { title: 'AI & automation', description: 'Exploring intelligent applications', skills: ['AI assistant development', 'API integration', 'Voice-controlled apps', 'Automation tools'] },
  { title: 'Tools & platforms', description: 'Everyday development workflow', skills: ['Git', 'GitHub', 'Visual Studio Code', 'PyCharm', 'Windows', 'Database management'] },
]
// Suggested skills are editable. Remove any technology you have not learned yet.
export const projects = [
  {
    id: 'smart-faculty',
    title: 'Smart Faculty Management',
    category: 'Web app · Academic project',
    status: 'In development',
    description: 'A faculty management system concept for organizing faculty records, attendance, leave requests, and lecture information.',
    overview: 'A college-oriented system planned around making everyday faculty administration easier through a clear interface and structured records.',
    features: ['Faculty record management concept', 'Attendance and leave tracking plan', 'Leave request workflow', 'Lecture status dashboard concept'],
    stack: ['Python', 'Web development', 'Database'],
    challenge: 'Designing a straightforward data model that can represent staff, attendance, and leave records consistently.',
    future: 'Complete and test core workflows, validate access permissions, and add deployment documentation.',
    visual: 'dashboard',
    liveUrl: '',
    repoUrl: '',
  },
  {
    id: 'smartbus',
    title: 'SmartBus Live Tracking',
    category: 'Mobility · Project concept',
    status: 'Concept',
    description: 'A proposed school, college, and university transport platform using a dedicated GPS device and mobile-friendly dashboard.',
    overview: 'The idea is to help students and parents understand bus location and pickup decisions through a coordinated app and institution dashboard.',
    features: ['Dedicated GPS device integration planned', 'Android app and web dashboard planned', 'Parent/student pickup decision flow', 'Institution-level fleet view concept'],
    stack: ['Android', 'Web dashboard', 'GPS integration'],
    challenge: 'Planning secure location updates, connectivity handling, and appropriate access for each institution and family.',
    future: 'Prototype the tracker data pipeline, define permissions, and test location accuracy before describing tracking as operational.',
    visual: 'map',
    liveUrl: '',
    repoUrl: '',
  },
]
