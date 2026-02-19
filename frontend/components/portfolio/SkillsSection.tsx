export default function SkillsSection() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'GraphQL', 'Server-side Logic'],
    },
    {
      category: 'Databases',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'SQL', 'Data Modeling'],
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Nginx', 'SSL/TLS', 'Postman'],
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive overview of technologies and tools I work with daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="bg-card border border-border rounded-lg p-8 hover:border-accent hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-primary mb-6">{category.category}</h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '5+', label: 'Projects Completed' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
