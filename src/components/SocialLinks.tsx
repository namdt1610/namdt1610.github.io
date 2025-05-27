import NeonButton from './NeonButton'

const socialLinks = [
    {
        name: 'GitHub',
        url: 'https://github.com/namdt1610',
        color: 'purple' as const,
    },
    {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/namdt1610',
        color: 'blue' as const,
    },
    {
        name: 'X',
        url: 'https://x.com/namdt1610',
        color: 'pink' as const,
    },
]

export default function SocialLinks() {
    return (
        <div className="flex flex-wrap gap-4">
            {socialLinks.map((social) => (
                <NeonButton
                    key={social.name}
                    color={social.color}
                    onClick={() => window.open(social.url, '_blank')}
                >
                    {social.name}
                </NeonButton>
            ))}
        </div>
    )
}
