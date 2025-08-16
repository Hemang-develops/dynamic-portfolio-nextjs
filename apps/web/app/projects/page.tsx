const projects = [
    { title: "Portfolio Website", description: "Personal portfolio built with Next.js" },
    { title: "Task Manager", description: "Full-stack app with React + Django backend" },
  ];
  
  export default function ProjectsPage() {
    return (
      <section>
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow-sm hover:shadow-md">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-600">{p.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  