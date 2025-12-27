import React from 'react';
import styles from './QRCode.module.css';

interface QRCodeProps {
    /**
     * URL or data to encode in the QR code
     */
    value: string;
    /**
     * Size of the QR code in pixels
     * @default 120
     */
    size?: number;
    /**
     * Alt text for accessibility
     * @default "QR Code"
     */
    alt?: string;
    /**
     * Optional CSS class
     */
    className?: string;
}

/**
 * QR Code component (FR-004.2)
 * 
 * Uses the Google Charts API to generate QR codes.
 * For production, consider using a dedicated library like 'qrcode.react' for offline capability.
 */
export function QRCode({ value, size = 120, alt = 'QR Code', className }: QRCodeProps) {
    // URL encode the value for the API
    const encodedValue = encodeURIComponent(value);

    // Generate QR code using Google Charts API (free, reliable)
    // Note: For production with high volume, consider switching to qrcode.react
    const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodedValue}&choe=UTF-8`;

    return (
        <div className={`${styles.qrContainer} ${className || ''}`}>
            <img
                src={qrUrl}
                alt={alt}
                width={size}
                height={size}
                className={styles.qrImage}
                loading="lazy"
            />
        </div>
    );
}

/**
 * Generate the QR code URL without rendering (for use in image generation)
 */
export function getQRCodeUrl(value: string, size: number = 120): string {
    const encodedValue = encodeURIComponent(value);
    return `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodedValue}&choe=UTF-8`;
}
