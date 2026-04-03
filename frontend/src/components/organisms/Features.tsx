'use client';


export function Features() {
    const features = [
        {
            title: 'Privacy First',
            description: 'Only you see the echoes.'
        },
        {
            title: '1-Minute Setup',
            description: 'Link, copy, share. Done.'
        },
        {
            title: 'Guided Journey',
            description: 'Dashboard tracks the summon bar.'
        }
    ];

    return (
        <section className="bg-background-dark px-6 py-24" aria-labelledby="features-title">
            <h2 id="features-title" className="mb-8 text-center font-display text-4xl font-bold text-text-primary">
                Features
            </h2>

            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3">
                {features.map((feature) => (
                    <div key={feature.title} className="atmospheric-surface p-8 text-center shadow-md transition-transform duration-300 hover:-translate-y-1">
                        <h3 className="mb-2 text-xl font-semibold text-text-primary">{feature.title}</h3>
                        <p className="text-base leading-relaxed text-text-muted">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
