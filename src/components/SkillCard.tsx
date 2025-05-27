import { motion } from 'framer-motion'
import NeonCard from './NeonCard'

interface Skill {
    name: string
    color: string
}

interface SkillCardProps {
    title: string
    skills: Skill[]
}

export default function SkillCard({ title, skills }: SkillCardProps) {
    return (
        <NeonCard color="purple">
            <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <motion.span
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, -5, 5, -5, 0],
                            }}
                            className={`${skill.color} text-white px-3 py-1 rounded-full text-sm font-medium`}
                        >
                            {skill.name}
                        </motion.span>
                    ))}
                </div>
            </div>
        </NeonCard>
    )
}
