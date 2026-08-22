import React from 'react'

const ValidationErrorMsg = ({error}) => {
    return (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0ZM10 5a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 10 5Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
                    clipRule="evenodd"
                />
            </svg>

            {error}
        </p>
    )
}

export default ValidationErrorMsg