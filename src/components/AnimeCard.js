export default function AnimeCard(props){
    return (
        <div className="border-4 border-rose-300">
            <h2>{props.titulo}</h2>
            <img src={props.imagen}/>
            <p>{props.description}</p>
        </div>
    )
}