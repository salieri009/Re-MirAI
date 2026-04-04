import React from 'react';
import { Icon } from '@/components/atoms/Icon';

interface StepCardProps {
    icon: string;
    title: string;
    description: string;
}

export const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-1 gap-4 rounded-lg border border-primary/20 bg-white/5 p-6 flex-col">
            <div className="text-accent">
                <Icon name={icon} size="32px" />
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-white text-lg font-bold leading-tight">{title}</h3>
                <p className="text-accent/75 text-sm font-normal leading-normal">{description}</p>
            </div>
        </div>
    );
};
