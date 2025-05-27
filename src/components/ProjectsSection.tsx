import ProjectCard from './ProjectCard'

const projectsData = [
    {
        title: 'Harmonia',
        period: '2025 - Present',
        description:
            'A full-stack music streaming application inspired by Spotify with real-time streaming, offline playback, user authentication, and admin dashboard.',
        features: [
            'High-quality real-time music streaming',
            'User authentication and profile management',
            'Admin dashboard for content management',
            'Cloud storage integration',
        ],
        technologies: ['Next.js', 'Django', 'PostgreSQL', 'Redis', 'Docker'],
        bgGradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
        emoji: '🎵',
        periodColor:
            'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        projectUrl: 'https://harmonia-wheat.vercel.app/',
        sourceUrl: 'https://github.com/namdt1610/harmonia-client',
    },
    {
        title: 'Chattr',
        period: 'Jan 2025 - May 2025',
        description:
            'A full-stack real-time chat application inspired by Messenger with real-time messaging, user authentication, and admin dashboard.',
        features: [
            'Real-time messaging',
            'User authentication and profile management',
            'Admin dashboard for content management',
            'Cloud storage integration',
        ],
        technologies: [
            'Next.js',
            'Express',
            'Socket.io',
            'MongoDB',
            'Redis',
            'Docker',
        ],
        bgGradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
        emoji: '💬',
        periodColor:
            'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        projectUrl: 'https://chattr-namdt1610s-projects.vercel.app/',
        sourceUrl: 'https://github.com/namdt1610/chatapp.frontend',
    },
    {
        title: 'BookScape',
        period: '2024 - 2025',
        description:
            'A comprehensive bookstore management system with inventory tracking, order processing, customer engagement, and analytics dashboard.',
        features: [
            'Inventory management with categorization',
            'Order tracking from purchase to delivery',
            'Loyalty program with reward points',
            'Real-time sales dashboard',
            'Secure payment gateway integration',
        ],
        technologies: ['React.js', 'Node.js', 'MongoDB', 'Ant Design'],
        bgGradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
        emoji: '📚',
        periodColor:
            'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
        projectUrl: 'https://mern-namdt1610s-projects.vercel.app/',
        sourceUrl: 'https://github.com/namdt1610/mern.frontend',
    },
]

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Some of my recent work
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    )
}
