import SocialLinks from './SocialLinks'

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4">Nam Dang</h3>
                    <p className="text-slate-400 mb-6">Full Stack Developer</p>
                    <div className="flex justify-center space-x-6 mb-8">
                        <SocialLinks />
                    </div>
                    <p className="text-slate-500 text-sm">
                        © 2025 Nam Dang. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
