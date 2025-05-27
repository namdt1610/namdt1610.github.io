import NeonButton from './NeonButton'

interface ProjectCardProps {
    title: string
    period: string
    description: string
    features: string[]
    technologies: string[]
    bgGradient: string
    emoji: string
    periodColor: string
    projectUrl?: string
    sourceUrl?: string
}

export default function ProjectCard({
    title,
    period,
    description,
    features,
    technologies,
    bgGradient,
    emoji,
    periodColor,
    projectUrl,
    sourceUrl,
}: ProjectCardProps) {
    return (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div
                className={`h-48 ${bgGradient} flex items-center justify-center`}
            >
                <div className="text-6xl">{emoji}</div>
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {title}
                    </h3>
                    <span
                        className={`${periodColor} px-3 py-1 rounded-full text-sm`}
                    >
                        {period}
                    </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {description}
                </p>

                <div className="mb-4">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                        Key Features:
                    </h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                        {features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex space-x-3">
                    <NeonButton
                        color="blue"
                        className="text-sm"
                        onClick={() =>
                            projectUrl && window.open(projectUrl, '_blank')
                        }
                    >
                        View Project
                    </NeonButton>
                    <NeonButton
                        color="purple"
                        className="text-sm"
                        onClick={() =>
                            sourceUrl && window.open(sourceUrl, '_blank')
                        }
                    >
                        Source Code
                    </NeonButton>
                </div>
            </div>
        </div>
    )
}
