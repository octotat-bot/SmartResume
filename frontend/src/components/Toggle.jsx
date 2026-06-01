import React from 'react';

const Toggle = ({ checked, onChange }) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
                checked ? 'bg-accent' : 'bg-ink/15'
            }`}
        >
            <span
                className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-out ${
                    checked ? 'translate-x-[8px]' : 'translate-x-[-8px]'
                }`}
            />
        </button>
    );
};

export default Toggle;
