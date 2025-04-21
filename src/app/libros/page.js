'use client'

import AnimeCard from "@/components/AnimeCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";

export default function Libros() {

    const [libros, setLibros] = useState([]);
    const [libroText, setLibroText] = useState("");

    const buscarLibro = (event) => {

        event.preventDefault();
         console.log("Libro", libroText);
 
         let baseUrl = "http://localhost:8080/";
         let endpoint = `libros/search/${libroText}`;
         if(libroText=="") {
             endpoint = "libros";
         }
 
         fetch(baseUrl+endpoint, {
             method: "GET",
            
         })
         .then((response)=>{return response.json()})
         .then((apiData)=>{
             setLibros(apiData.data[0]);
 
        })
 
    }

    useEffect(()=>{
        let baseUrl = "http://localhost:8080/";
        let endpoint = "libros";

        fetch(baseUrl+endpoint, {
            method: "GET",
        
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            setLibros(apiData.data[0]);

        })
    
    }, [])

return (
    <>
        <h1 className="text-center text-3xl font-bold text-rose-300 m-5">Libros</h1>
        <h2 className="m-5">Buscar Libro</h2>
        <form onSubmit={buscarLibro} className="flex flex-col px-5 gap-3">
            <Input id="txtLibro" text="Nombre" name="nombre" onChange={(event) => {setLibroText(event.target.value)}}/>
            <Button>Buscar Libro</Button>
        </form>

        {
            libros.map((libro)=>{
                return (
                    <AnimeCard 
                            key={libro.idLibro} 
                            titulo={libro.nombreEspanol} 
                            imagen={libro.imgPrincipal} 
                            description={libro.sinopsis}>
                            <div className="flex gap-3 my-3">
                                <Button>Agregar a mi lista</Button>
                                <Button>Eliminar Libro</Button>
                                <Button>Editar</Button>
                            </div>    
                            
                    </AnimeCard>
                )
                
            })
        }
    </> 
)
}