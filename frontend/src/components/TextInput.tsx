import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelFor?: string;
    errorMessage?: string;
    rightIcon?: JSX.Element;
    rightIconOnClick?: () => void;
}

const TextInput = (props: InputProps) => {
    const { labelFor, label, errorMessage, rightIcon, rightIconOnClick, ...otherProps } = props;

    let labelClassName = `block mb-2 text-sm font-medium text-gray-900 dark:text-white`;
    let inputClassName = `bg-gray-50 border border-gray-300 text-gray-900 dark:text-gray-400 placeholder-gray-700 dark:placeholder-gray-500 text-sm rounded-lg focus:ring-skyblue-300 focus:border-skyblue-300 block w-full pl-2.5 pr-[60px] py-2.5 dark:bg-gray-700 dark:border-gray-500`;

    if (errorMessage) {
        labelClassName = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500";
        inputClassName =
            "bg-red-50 border border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-red-500";
    }

    return (
        <>
            <div>
                {label && (
                    <label htmlFor={labelFor} className={labelClassName}>
                        {label}
                    </label>
                )}
                <div className="flex items-center relative">
                    <input {...otherProps} id={labelFor} className={inputClassName} />
                    <div
                        onClick={rightIconOnClick}
                        className="absolute right-4 cursor-pointer text-gray-700 text-sm"
                    >
                        {rightIcon}
                    </div>
                </div>
                {errorMessage && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
                )}
            </div>
        </>
    );
};

export default TextInput;
