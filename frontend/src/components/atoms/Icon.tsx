'use client';

import React from 'react';
import { CSSProperties } from '@/lib/styles';

interface IconProps {
    name: string;
    size?: string | number;
    color?: string;
    style?: CSSProperties;
}

export const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color,
    style
}) => {
    const iconStyle: CSSProperties = {
        fontSize: typeof size === 'number' ? `${size}px` : size,
        color: color,
        ...style,
    };

    return (
        <span
            className="material-symbols-outlined"
            style={iconStyle}
        >
            {name}
        </span>
    );
};
