'use client';


export function HowItWorks() {
    const steps = [
        {
            number: '1',
            title: 'One tap. Your ritual survey is live.'
        },
        {
            number: '2',
            title: 'Collect Echoes',
            description: 'Friends drop anonymous notes in under 2 min.'
        },
        {
            number: '3',
            title: 'Summon the Persona',
            description: 'AI weaves the echoes into an anime twin.'
        }
    ];

    return (
        <section className="bg-surface px-6 py-24" aria-labelledby="how-it-works-title">
            <h2 id="how-it-works-title" className="mb-8 text-center font-display text-4xl font-bold text-text-primary">
                How It Works
            </h2>

            <div className="mx-auto flex w-full max-w-[800px] flex-col gap-6">
                {steps.map((step) => (
                    <div key={step.number} className="atmospheric-surface flex items-start gap-6 p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xl font-bold text-text-primary">{step.number}</div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
                            {step.description && (
                                <p className="text-base leading-relaxed text-text-muted">{step.description}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
