

export default function Label({className = "", ...props}) {
    return (
        <label
            className={`${className} block text-indigo-700`}
            {...props} />
    )
}