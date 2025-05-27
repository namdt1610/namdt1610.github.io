import { motion } from 'framer-motion'

interface NeonCardProps {
    children: React.ReactNode
    className?: string
    color?: 'blue' | 'purple' | 'pink' | 'green'
}

export default function NeonCard({
    children,
    className = '',
    color = 'blue',
}: NeonCardProps) {
    const colorClasses = {
        blue: 'border-blue-500 shadow-[0_0_5px_#3b82f6,0_0_20px_#3b82f6] hover:shadow-[0_0_5px_#3b82f6,0_0_20px_#3b82f6,0_0_40px_#3b82f6]',
        purple: 'border-purple-500 shadow-[0_0_5px_#a855f7,0_0_20px_#a855f7] hover:shadow-[0_0_5px_#a855f7,0_0_20px_#a855f7,0_0_40px_#a855f7]',
        pink: 'border-pink-500 shadow-[0_0_5px_#ec4899,0_0_20px_#ec4899] hover:shadow-[0_0_5px_#ec4899,0_0_20px_#ec4899,0_0_40px_#ec4899]',
        green: 'border-green-500 shadow-[0_0_5px_#22c55e,0_0_20px_#22c55e] hover:shadow-[0_0_5px_#22c55e,0_0_20px_#22c55e,0_0_40px_#22c55e]',
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={`
                relative rounded-xl
                border-2 bg-white dark:bg-slate-800
                transition-all duration-300
                ${colorClasses[color]}
                ${className}
            `}
        >
            {children}
        </motion.div>
    )
}
