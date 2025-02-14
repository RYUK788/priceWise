'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ShareButtonProps {
    url: string;
}

const ShareButton = ({ url }: ShareButtonProps) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000);
        } catch (err) {
            console.error('Failed to copy link: ', err);
        }
    };

    return (
        <div className="relative">
            <button 
                onClick={handleCopy}
                className="p-2 bg-white-200 rounded-10 cursor-pointer hover:bg-gray-100 flex items-center justify-center"
                aria-label="Copy product link to clipboard"
            >
                <Image
                    src="/assets/icons/share.svg"
                    alt="share"
                    width={20}
                    height={20}
                />
            </button>
            {showTooltip && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Link copied!
                </div>
            )}
        </div>
    );
};

export default ShareButton;