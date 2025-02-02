import React, { useState } from 'react';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [experienceLevel, setExperienceLevel] = useState('all');
  const [jobType, setJobType] = useState('all');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const jobs = [
    {
      id: '1',
      title: 'Senior Cardiologist',
      department: 'Medical',
      location: 'Main Campus',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹200,000 - ₹300,000',
      description: 'Looking for an experienced cardiologist to join our heart center team.',
      requirements: [
        'MD or equivalent medical degree',
        'Board certification in Cardiology',
        '5+ years of clinical experience',
        'Experience with cardiac catheterization',
        'Strong leadership and communication skills'
      ],
      responsibilities: [
        'Diagnose and treat cardiovascular conditions',
        'Perform diagnostic tests and procedures',
        'Collaborate with multidisciplinary teams',
        'Participate in research activities',
        'Mentor junior doctors and residents'
      ]
    },
    {
      id: '2',
      title: 'Registered Nurse',
      department: 'Nursing',
      location: 'Emergency Ward',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '₹65,000 - ₹85,000',
      description: 'Seeking dedicated nurses for our emergency department.',
      requirements: [
        'BSN degree required',
        'Current RN license',
        '2+ years of emergency nursing experience',
        'BLS and ACLS certification',
        'Strong multitasking abilities'
      ],
      responsibilities: [
        'Provide direct patient care',
        'Assess and monitor patient conditions',
        'Administer medications and treatments',
        'Coordinate with healthcare team',
        'Maintain accurate medical records'
      ]
    },
    {
      id: '3',
      title: 'Medical Administrator',
      department: 'Administrative',
      location: 'Main Office',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '₹55,000 - ₹75,000',
      description: 'Administrative role supporting medical departments.',
      requirements: [
        "Bachelor's degree in Healthcare Administration or related field",
        '3+ years of healthcare administrative experience',
        'Proficiency in medical coding and billing',
        'Strong organizational skills',
        'Experience with healthcare software'
      ],
      responsibilities: [
        'Manage administrative operations',
        'Coordinate scheduling and appointments',
        'Handle insurance and billing inquiries',
        'Maintain medical records',
        'Support medical staff'
      ]
    },
    {
      id: '4',
      title: 'Pediatrician',
      department: 'Medical',
      location: 'Children\'s Wing',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹180,000 - ₹250,000',
      description: 'Join our pediatric care team providing comprehensive children\'s healthcare.',
      requirements: [
        'MD with Pediatric specialization',
        'Board certification in Pediatrics',
        '5+ years experience in pediatric care',
        'Excellence in patient communication',
        'Experience with developmental assessments'
      ],
      responsibilities: [
        'Provide primary care to children',
        'Conduct well-child visits',
        'Diagnose and treat pediatric conditions',
        'Coordinate with specialists',
        'Provide parent education and support'
      ]
    },
    {
      id: '5',
      title: 'Physical Therapist',
      department: 'Rehabilitation',
      location: 'Rehabilitation Center',
      type: 'Part-time',
      experience: 'Entry-level',
      salary: '₹45,000 - ₹65,000',
      description: 'Physical therapist needed for our growing rehabilitation department.',
      requirements: [
        'DPT degree',
        'State PT license',
        'Strong manual therapy skills',
        'Experience with rehabilitation equipment',
        'Excellent patient care skills'
      ],
      responsibilities: [
        'Evaluate patient conditions',
        'Develop treatment plans',
        'Provide therapeutic exercises',
        'Document patient progress',
        'Collaborate with healthcare team'
      ]
    },
    {
      id: '6',
      title: 'Laboratory Technician',
      department: 'Laboratory',
      location: 'Main Campus',
      type: 'Part-time',
      experience: 'Entry-level',
      salary: '₹40,000 - ₹55,000',
      description: 'Laboratory technician needed for diagnostic testing.',
      requirements: [
        "Associate's degree in Medical Laboratory Science",
        'Lab technician certification',
        'Knowledge of lab safety protocols',
        'Attention to detail',
        'Computer proficiency'
      ],
      responsibilities: [
        'Perform laboratory tests',
        'Maintain lab equipment',
        'Process specimens',
        'Record test results',
        'Follow safety protocols'
      ]
    }
  ];

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = department === 'all' || job.department === department;
    const matchesExperience = experienceLevel === 'all' || job.experience === experienceLevel;
    const matchesType = jobType === 'all' || job.type === jobType;
    return matchesSearch && matchesDepartment && matchesExperience && matchesType;
  });

  const JobCard = ({ job }: { job: typeof jobs[0] }) => (
    <div 
      className={`p-6 rounded-lg border transition-all duration-200 ₹{
        selectedJob === job.id 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="cursor-pointer" onClick={() => setSelectedJob(job.id)}>
          <h3 className="text-xl font-semibold text-blue-800">{job.title}</h3>
          <p className="text-gray-600 mt-1">{job.department}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleSaveJob(job.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            {savedJobs.includes(job.id) ? '★' : '☆'}
          </button>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {job.type}
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <span className="mr-2">📍</span> {job.location}
        </div>
        <div className="flex items-center text-gray-600">
          <span className="mr-2">⏳</span> {job.experience}
        </div>
        <div className="flex items-center text-gray-600">
          <span className="mr-2">💰</span> {job.salary}
        </div>
      </div>
    </div>
  );

  const ApplicationForm = ({ job }: { job: typeof jobs[0] }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg mt-6">
      <h3 className="text-2xl font-bold text-blue-800 mb-6">Apply for {job.title}</h3>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Resume</label>
          <input
            type="file"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Cover Letter</label>
          <textarea
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            rows={4}
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setShowApplicationForm(false)}
            className="px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-blue-100 mb-8">Make a difference in healthcare with IGKC Hospital</p>
            <div className="max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for jobs..."
                className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Why Choose IGKC Hospital?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "🏥",
                title: "Comprehensive Benefits",
                description: "Medical, dental, and vision coverage for you and your family"
              },
              {
                icon: "📚",
                title: "Professional Development",
                description: "Continuing education and career growth opportunities"
              },
              {
                icon: "⚖️",
                title: "Work-Life Balance",
                description: "Flexible scheduling and paid time off"
              },
              {
                icon: "🎯",
                title: "Career Growth",
                description: "Clear career paths and promotion opportunities"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Job Listings Section */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <h2 className="text-3xl font-bold text-blue-800">Open Positions</h2>
            <div className="flex flex-wrap gap-4">
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Medical">Medical</option>
                <option value="Nursing">Nursing</option>
                <option value="Administrative">Administrative</option>
                <option value="Rehabilitation">Rehabilitation</option>
                <option value="Laboratory">Laboratory</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <option value="all">All Experience Levels</option>
                <option value="Entry-level">Entry Level</option>
                <option value="Mid-level">Mid Level</option>
                <option value="Senior">Senior</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full Time</option>
                <option value="Part-time">Part Time</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="text-center py-12 text-gray-600">
                No jobs found matching your criteria.
                </div>
            )}
          </div>
        </section>
      </main>

      {/* Job Details and Application Form */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedJob(null)}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-blue-800">{jobs.find(job => job.id === selectedJob)?.title}</h3>
            <p className="text-gray-600 mt-2">{jobs.find(job => job.id === selectedJob)?.description}</p>
            <h4 className="text-xl font-semibold mt-6 text-blue-700">Requirements</h4>
            <ul className="list-disc ml-6 text-gray-700">
              {jobs.find(job => job.id === selectedJob)?.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            <h4 className="text-xl font-semibold mt-6 text-blue-700">Responsibilities</h4>
            <ul className="list-disc ml-6 text-gray-700">
              {jobs.find(job => job.id === selectedJob)?.responsibilities.map((res, index) => (
                <li key={index}>{res}</li>
              ))}
            </ul>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowApplicationForm(false)}
            >
              ✕
            </button>
            <ApplicationForm job={jobs.find(job => job.id === selectedJob)!} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPage;
