export default function AnimeCard({titulo, imagen, description, children, ...props}){
    return (
        <div className="border-4 border-rose-300" {...props}>
            <h2>{titulo}</h2>
            <img src={imagen}/>
            <p>{description}</p>
            {children}
        </div>
    )
}