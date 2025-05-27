import NeonButton from './NeonButton'

export default function HeroSection() {
    return (
        <section className="pt-24 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6">
                            Full Stack
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {' '}
                                Developer
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                            Passionate Full Stack Web Developer specializing in
                            React, Node.js, Django, and MongoDB. Strong
                            foundation in backend architecture and cloud
                            deployment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <NeonButton
                                color="blue"
                                onClick={() =>
                                    document
                                        .getElementById('projects')
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }
                            >
                                View My Work
                            </NeonButton>
                            <NeonButton
                                color="purple"
                                onClick={() =>
                                    document
                                        .getElementById('contact')
                                        ?.scrollIntoView({ behavior: 'smooth' })
                                }
                            >
                                Get In Touch
                            </NeonButton>
                            <NeonButton
                                color="green"
                                onClick={() => window.open('/cv.pdf', '_blank')}
                            >
                                Download CV
                            </NeonButton>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-80 h-80 mx-auto relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                            <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center">
                                <div className="text-6xl">👨‍💻</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
