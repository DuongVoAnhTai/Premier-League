export default function Button({ type = "submit", className = "", ...props }: { type?: "submit" | "reset" | "button", className?: string, [key: string]: any }) {
    return (
        <button 
            type={type}
            className={`${className} bg-blue-500 text-white p-2 rounded`}
            {...props}
        />
    )
}