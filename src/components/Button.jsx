import React from 'react';

function Button({children,
                className="",
                type="button",
                ...props}) {
    return (
        <button className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${className}`} type={type} {...props}>
            {children}
        </button>
    );
}

export default Button;