import React, {useId} from 'react';

function Input({className="",
               type="text",
                   label,
                   ...props},ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && (<label htmlFor={id} className="inline-block mb-1 pl-1">{label}</label>)}
            <input id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} type={type} {...props}/>
        </div>
    )
}

export default React.forwardRef(Input);