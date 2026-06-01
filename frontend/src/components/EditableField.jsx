import React, { useRef, useEffect } from 'react';

const EditableField = ({ 
    value, 
    onChange, 
    placeholder = 'Empty', 
    className = '', 
    multiline = false,
    readOnly = false
}) => {
    const inputRef = useRef(null);

    const handleInput = (e) => {
        if (multiline && inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
        onChange(e.target.value);
    };

    // Auto-resize on mount if multiline
    useEffect(() => {
        if (multiline && inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [value, multiline]);

    const commonClasses = `bg-transparent border-transparent hover:bg-black/5 focus:bg-white focus:outline-none focus:ring-1 focus:ring-accent rounded transition-colors resize-none overflow-hidden m-[-2px] p-[2px] ${className} ${readOnly ? 'pointer-events-none hover:bg-transparent' : ''}`;

    if (multiline) {
        return (
            <textarea
                ref={inputRef}
                value={value}
                onChange={handleInput}
                placeholder={placeholder}
                className={`w-full block ${commonClasses}`}
                rows={1}
                readOnly={readOnly}
            />
        );
    }

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full inline-block ${commonClasses}`}
            readOnly={readOnly}
        />
    );
};

export default EditableField;
