import { motion } from 'framer-motion'

interface NeonButtonProps {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    color?: 'blue' | 'purple' | 'pink' | 'green'
}

export default function NeonButton({
    children,
    onClick,
    className = '',
    color = 'blue',
}: NeonButtonProps) {
    const colorClasses = {
        blue: 'border-blue-500 text-blue-500 shadow-[0_0_5px_#3b82f6,0_0_20px_#3b82f6] hover:shadow-[0_0_5px_#3b82f6,0_0_20px_#3b82f6,0_0_40px_#3b82f6]',
        purple: 'border-purple-500 text-purple-500 shadow-[0_0_5px_#a855f7,0_0_20px_#a855f7] hover:shadow-[0_0_5px_#a855f7,0_0_20px_#a855f7,0_0_40px_#a855f7]',
        pink: 'border-pink-500 text-pink-500 shadow-[0_0_5px_#ec4899,0_0_20px_#ec4899] hover:shadow-[0_0_5px_#ec4899,0_0_20px_#ec4899,0_0_40px_#ec4899]',
        green: 'border-green-500 text-green-500 shadow-[0_0_5px_#22c55e,0_0_20px_#22c55e] hover:shadow-[0_0_5px_#22c55e,0_0_20px_#22c55e,0_0_40px_#22c55e]',
    }

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                relative px-6 py-3 rounded-lg
                border-2 bg-transparent
                transition-all duration-300
                ${colorClasses[color]}
                ${className}
            `}
            onClick={onClick}
        >
            <span className="relative z-10">{children}</span>
            <motion.div
                className="absolute inset-0 rounded-lg bg-current opacity-0"
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.2 }}
            />
        </motion.button>
    )
}
