import React from 'react';

const EmptyState = ({ icon: Icon, title, description, action }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[240px] px-6 text-center">
            {Icon && (
                <div className="mb-4 text-ink opacity-40">
                    <Icon className="w-10 h-10 stroke-[1.5px]" />
                </div>
            )}
            <h3 className="text-[16px] font-medium text-ink mb-1 font-sans tracking-tight">
                {title}
            </h3>
            {description && (
                <p className="text-[14px] text-ink/60 font-sans max-w-sm mb-6">
                    {description}
                </p>
            )}
            {action && (
                <div>
                    {action}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
