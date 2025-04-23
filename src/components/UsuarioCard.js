export default function UsuarioCard({nombre, nombrePerfil, fotoPerfil, children, ...props}){
    return (
        <div className="border-4 border-rose-300" {...props}>
            <h2>{nombrePerfil}</h2>
            <p>{nombre}</p>
            <img src={fotoPerfil}/>
            {children}
        </div>
    )
}