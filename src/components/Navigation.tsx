import { motion } from 'framer-motion'

export default function Navigation() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-700"
        >
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <motion.a
                        href="#home"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-slate-800 dark:text-white"
                    >
                        Dang Tran Nam
                    </motion.a>
                    <div className="flex space-x-8">
                        {['about', 'skills', 'projects', 'contact'].map(
                            (item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item}`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item.charAt(0).toUpperCase() +
                                        item.slice(1)}
                                </motion.a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}
