import { motion } from 'framer-motion'

const FloatingElement = ({
    delay,
    duration,
    x,
    y,
    size,
    color,
}: {
    delay: number
    duration: number
    x: number
    y: number
    size: number
    color: string
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
                x: [0, x, 0],
                y: [0, y, 0],
            }}
            transition={{
                duration: duration,
                delay: delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            className={`absolute rounded-full ${color} blur-sm`}
            style={{
                width: size,
                height: size,
            }}
        />
    )
}

export default function BackgroundAnimation() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <FloatingElement
                delay={0}
                duration={8}
                x={100}
                y={50}
                size={300}
                color="bg-blue-500/20"
            />
            <FloatingElement
                delay={1}
                duration={10}
                x={-150}
                y={-100}
                size={400}
                color="bg-purple-500/20"
            />
            <FloatingElement
                delay={2}
                duration={12}
                x={200}
                y={-50}
                size={250}
                color="bg-pink-500/20"
            />
            <FloatingElement
                delay={3}
                duration={9}
                x={-100}
                y={150}
                size={350}
                color="bg-green-500/20"
            />
        </div>
    )
}
