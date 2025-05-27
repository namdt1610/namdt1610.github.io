interface ContactInfoProps {
    icon: string
    title: string
    value: string
    bgColor: string
    iconColor: string
    link: string
}

export default function ContactInfo({
    icon,
    title,
    value,
    bgColor,
    iconColor,
    link,
}: ContactInfoProps) {
    return (
        <div className="flex items-center space-x-4">
            <div
                className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}
            >
                <span className={`${iconColor} text-xl`}>{icon}</span>
            </div>
            <div>
                <h4 className="font-semibold text-slate-800 dark:text-white">
                    {title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300">
                    <a target="_blank" rel="noopener noreferrer" href={link}>
                        {value}
                    </a>
                </p>
            </div>
        </div>
    )
}
