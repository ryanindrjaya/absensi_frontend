'use client';

import { useEffect, useState } from 'react';

interface LabelScoreInterface {
    score: number,
    className?: string
}

const LabelScore = ({ score, className = '' }: LabelScoreInterface) => {
    const [label, setLabel] = useState('');
    const [colorClass, setColorClass] = useState('');

    const generateLabelAndClass = (score: number) => {
        let colorClass = '';
        let label = '';

        if (score >= 90) {
            colorClass = 'text-[#1A76F3] border-[#1A76F3] bg-[#D1E4FD]';
            label = 'Excellent';
        } else if (score >= 80 && score <= 89) {
            colorClass = 'text-[#009700] border-[#009700] bg-[#EAFFEA]';
            label = 'Good';
        } else if (score >= 70 && score <= 79) {
            colorClass = 'text-[#E86124] border-[#E86124] bg-[#FFF1DE]';
            label = 'Average';
        } else if (score >= 60 && score <= 69) {
            colorClass = 'text-[#FF0000] border-[#FF0000] bg-[#FFE5E5]';
            label = 'Poor';
        } else if (score >= 59) {
            colorClass = 'text-[#121212] border-[#121212] bg-[#FFFFFF]';
            label = 'Incomplete';
        } else {
            colorClass = 'text-[#A1A1A1] border-[#A1A1A1] bg-[#FFFFFF] text-[#A1A1A1]';
            label = 'Not Assessed';
        }

        setLabel(label);
        setColorClass(colorClass);
    }


    useEffect(() => {
        generateLabelAndClass(score);
    }, [score])

    const defaultClass = `block label-score min-w-[130px] font-semibold text-[12px] md:text-[12px] leading-none py-1 px-4 text-center border border-solid rounded-[12px]`;

    return (
        <span className={`${defaultClass} ${colorClass} ${className}`}>{label}</span>
    );
};

export default LabelScore;