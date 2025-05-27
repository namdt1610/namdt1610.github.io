export default function AboutSection() {
    return (
        <section id="about" className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        About Me
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Get to know me better
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
                            Education & Background
                        </h3>
                        <div className="space-y-6">
                            <div className="border-l-4 border-blue-500 pl-6">
                                <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                                    Bachelor of Software Engineering
                                </h4>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Saigon University • 2021 - 2026
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-6">
                                <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                                    Current Certifications
                                </h4>
                                <ul className="text-slate-600 dark:text-slate-300 space-y-1">
                                    <li>• Google Ads For Beginners</li>
                                    <li>• TOEIC (In Progress)</li>
                                    <li>• AWS Cloud (In Progress)</li>
                                    <li>
                                        • MongoDB Certifications (In Progress)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
                            Languages
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-800 dark:text-white">
                                    Vietnamese
                                </span>
                                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                                    Native
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-800 dark:text-white">
                                    English
                                </span>
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                                    Intermediate
                                </span>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
                                Contact Info
                            </h3>
                            <address className="space-y-3 text-slate-600 dark:text-slate-300">
                                {/* <p>📱 0764872970</p> */}
                                <p>
                                    <a href="mailto:nam.dt161@gmail.com">
                                        ✉️ nam.dt161@gmail.com
                                    </a>
                                </p>
                                <p>📍 Truong Son, Ward 15, District 10, HCMC</p>
                                <p>
                                    <a href="https://namdt1610.github.io">
                                        🌐 namdt1610.github.io
                                    </a>
                                </p>
                            </address>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
