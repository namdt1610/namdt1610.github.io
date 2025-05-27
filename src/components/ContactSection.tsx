import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'

const contactData = [
    // {
    //     icon: '📱',
    //     title: 'Phone',
    //     value: '0764872970',
    //     bgColor: 'bg-blue-100 dark:bg-blue-900',
    //     iconColor: 'text-blue-600 dark:text-blue-400',
    // },
    {
        icon: '✉️',
        title: 'Email',
        value: 'nam.dt161@gmail.com',
        bgColor: 'bg-green-100 dark:bg-green-900',
        iconColor: 'text-green-600 dark:text-green-400',
        link: 'mailto:nam.dt161@gmail.com',
    },
    {
        icon: '📍',
        title: 'Location',
        value: 'District 10, HCMC',
        bgColor: 'bg-purple-100 dark:bg-purple-900',
        iconColor: 'text-purple-600 dark:text-purple-400',
        link: 'https://goo.gl/maps/',
    },
    {
        icon: '🌐',
        title: 'Website',
        value: 'namdt1610.github.io',
        bgColor: 'bg-orange-100 dark:bg-orange-900',
        iconColor: 'text-orange-600 dark:text-orange-400',
        link: 'https://namdt1610.github.io',
    },
    {
        icon: '💼',
        title: 'LinkedIn',
        value: 'Nam Dang Tran',
        bgColor: 'bg-blue-100 dark:bg-blue-900',
        iconColor: 'text-blue-600 dark:text-blue-400',
        link: 'https://www.linkedin.com/in/nam-dangtran/',
    },
]

export default function ContactSection() {
    return (
        <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Let&apos;s work together
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6">
                            Contact Information
                        </h3>
                        <div className="space-y-6">
                            {contactData.map((contact, index) => (
                                <ContactInfo key={index} {...contact} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
