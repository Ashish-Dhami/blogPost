import React from 'react';

function Select({className="",
                    options,
                    label,
                    ...props},ref) {
    const id= React.useId()
    return (
        <div className="w-full">
            {label && (<label htmlFor={id} className="inline-block mb-1 pl-1">{label}</label>)}
            <select id={id} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} {...props} ref={ref}>
                {options?.map((status)=>(
                    <option key={status} value={status}>{status.charAt(0).toUpperCase()+status.slice(1)}</option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);