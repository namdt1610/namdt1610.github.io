import SkillCard from './SkillCard'

const skillsData = [
    {
        title: 'Programming',
        skills: [
            { name: 'TypeScript', color: 'bg-blue-500' },
            { name: 'Python', color: 'bg-yellow-500' },
            { name: 'Java', color: 'bg-red-500' },
            { name: 'C++', color: 'bg-red-500' },
        ],
    },
    {
        title: 'Frontend',
        skills: [
            { name: 'React', color: 'bg-cyan-500' },
            { name: 'Next.js', color: 'bg-black' },
            { name: 'Tailwind CSS', color: 'bg-blue-500' },
            { name: 'Bootstrap', color: 'bg-purple-500' },
            { name: 'Shadcn UI', color: 'bg-black' },
            { name: 'Ant Design', color: 'bg-blue-500' },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', color: 'bg-green-500' },
            { name: 'Django', color: 'bg-green-700' },
            { name: 'Express.js', color: 'bg-gray-500' },
            { name: 'Nest.js', color: 'bg-red-500' },
        ],
    },
    {
        title: 'Database',
        skills: [
            { name: 'MongoDB', color: 'bg-green-600' },
            { name: 'PostgreSQL', color: 'bg-blue-600' },
            { name: 'MySQL', color: 'bg-orange-500' },
            { name: 'MSSQL', color: 'bg-red-500' },
        ],
    },
    {
        title: 'System Design',
        skills: [
            { name: 'REST APIs', color: 'bg-purple-500' },
            { name: 'JWT & OAuth', color: 'bg-red-500' },
        ],
    },
    {
        title: 'DevOps & Cloud',
        skills: [
            { name: 'Docker', color: 'bg-blue-500' },
            { name: 'Kubernetes', color: 'bg-blue-600' },
            { name: 'AWS (EC2, RDS, S3)', color: 'bg-orange-500' },
            { name: 'Redis', color: 'bg-red-600' },
        ],
    },
]

export default function SkillsSection() {
    return (
        <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        Technical Skills
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Technologies I work with
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillsData.map((skillCategory, index) => (
                        <SkillCard
                            key={index}
                            title={skillCategory.title}
                            skills={skillCategory.skills}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
