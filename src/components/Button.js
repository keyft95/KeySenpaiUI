export default function Button({children, ...props}){
    return (
        <button className="  bg-rose-300 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded-full" {...props}> 
                {children}
        </button>
    )
}