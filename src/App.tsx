import {
    Navigation,
    HeroSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    ContactSection,
    Footer,
} from './components'
import BackgroundAnimation from './components/BackgroundAnimation'

function App() {
    return (
        <div id="home" className="min-h-screen bg-white dark:bg-slate-900">
            <BackgroundAnimation />
            <Navigation />
            <main>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    )
}

export default App
