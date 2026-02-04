import React from 'react';

interface GradientCardProps {
    children: React.ReactNode;
    className?: string;
    backgroundImage?: string;
    backgroundBlendMode?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({
    children,
    className = '',
    backgroundImage,
    backgroundBlendMode
}) => {
    return (
        <div className={`@container`}>
            <div className="@[480px]:p-4">
                <div
                    className={`flex flex-col bg-cover bg-center bg-no-repeat @[480px]:rounded-xl items-center justify-center p-4 text-center relative overflow-hidden ${className}`}
                    style={{
                        backgroundImage: backgroundImage,
                        backgroundBlendMode: backgroundBlendMode as any
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};
