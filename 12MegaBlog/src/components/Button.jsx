import React from "react";

export default function Button({
    // children prop means whatever is passed between the opening and closing tags of the Button component,
    // it will be rendered inside the button (it may be text or other elements)
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}