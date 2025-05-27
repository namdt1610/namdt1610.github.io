import NeonButton from './NeonButton'

export default function ContactForm() {
    return (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
                Send a Message
            </h3>
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                        placeholder="your.email@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Message
                    </label>
                    <textarea
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                        placeholder="Your message..."
                    ></textarea>
                </div>
                <NeonButton type="submit" color="blue" className="w-full">
                    Send Message
                </NeonButton>
            </form>
        </div>
    )
}
