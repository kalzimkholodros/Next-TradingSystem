"use client";

import Navbar from "../components/Navbar";

export default function Projects() {
  const projects = [
    {
      title: "Project Alpha",
      description: "A cutting-edge AI-powered analytics dashboard",
      tech: ["React", "TensorFlow", "Node.js"],
      status: "In Progress",
      completion: 75
    },
    {
      title: "Beta Platform",
      description: "Cloud-based collaboration tools for remote teams",
      tech: ["Next.js", "AWS", "GraphQL"],
      status: "Completed",
      completion: 100
    },
    {
      title: "Gamma Suite",
      description: "Enterprise security and monitoring solution",
      tech: ["Python", "Docker", "Kubernetes"],
      status: "Planning",
      completion: 25
    },
    {
      title: "Delta Tools",
      description: "Developer productivity toolkit and extensions",
      tech: ["TypeScript", "Electron", "Redis"],
      status: "In Review",
      completion: 90
    }
  ];

  return (
    <div className="min-h-screen bg-black text-[#39FF14] relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full z-0">
        <img
          src="/matrix-bg.jpg"
          alt="Matrix Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40 z-10"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.1),transparent_50%)] z-20"></div>

      <Navbar />

      <main className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl text-[#39FF14]/80">Explore our innovative solutions and ongoing developments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative p-6 border border-[#39FF14]/20 rounded-xl 
                       hover:border-[#39FF14]/60 hover:shadow-[0_0_30px_rgba(57,255,20,0.1)] 
                       transition-all duration-300 bg-black/50 backdrop-blur-sm 
                       hover:bg-black/70 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/0 via-[#39FF14]/5 to-[#39FF14]/0 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === "Completed" ? "bg-[#39FF14]/20 text-[#39FF14]" :
                    project.status === "In Progress" ? "bg-blue-500/20 text-blue-400" :
                    project.status === "In Review" ? "bg-purple-500/20 text-purple-400" :
                    "bg-orange-500/20 text-orange-400"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-[#39FF14]/70 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-[#39FF14]">
                        Completion
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[#39FF14]">
                        {project.completion}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#39FF14]/10">
                    <div 
                      style={{ width: `${project.completion}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#39FF14]/40"
                    ></div>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 border border-[#39FF14]/50 rounded-lg 
                                hover:border-[#39FF14] hover:bg-[#39FF14]/10 
                                transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 