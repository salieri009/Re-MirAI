'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SummoningAnimation } from '@/components/organisms/SummoningAnimation';

export default function SummonPage() {
    const router = useRouter();
    const [isComplete, setIsComplete] = useState(false);

    // Mock persona data - in real app this would come from API/Store
    const mockPersona = {
        id: 'p-123',
        name: 'The Guardian',
        archetype: 'Protector',
        rarity: 'Rare',
    };

    const handleComplete = () => {
        setIsComplete(true);
        // Redirect to Persona Room after animation
        setTimeout(() => {
            router.push(`/p/${mockPersona.id}`);
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-background-dark overflow-hidden">
            <SummoningAnimation
                persona={mockPersona}
                onComplete={handleComplete}
                variant="fated"
            />
        </main>
    );
}
