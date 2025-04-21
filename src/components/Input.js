export default function Input({id, text, type = "text", ...props}){
    return (
        <label htmlFor={id}>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200"> {text} </span>
        <input
            type={type}
            id={id}
            {...props}
            className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
        </label>
    )
}