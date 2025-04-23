'use client'

import AnimeCard from "@/components/AnimeCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Libros() {

    const [libros, setLibros] = useState([]);
    const [libroText, setLibroText] = useState("");
    const [usuarios, setUsuarios] = useState([]);

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

    const eliminarLibro = (id) => {

        let baseUrl = "http://localhost:8080/";
        let endpoint = `libros/${id}`;

        fetch(baseUrl+endpoint, {
            method: "DELETE",
           
        })
        .then(() => {
            setLibros((prevLibros) => 
                prevLibros.filter((libro) => libro.idLibro !== id)  
            );
        });
        
        alert("Se ha eliminado el libro");
    }

    useEffect(()=>{
        let baseUrl = "http://localhost:8080/";
        let endpoint = "libros";

        fetch(baseUrl+endpoint, {
            method: "GET",
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            let libroTemporal = apiData.data[0];
            libroTemporal = libroTemporal.filter((libro) => {return libro.activo==true})
            setLibros(libroTemporal);

        })

    }, [])

return (
    <>
        <h1 className="text-center text-3xl font-bold text-rose-300 m-5">Libros</h1>
        <div className="flex justify-end">
            <Link href="/libros/add">
                <button type="button" className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-300 dark:hover:bg-rose-400 dark:focus:ring-rose-500">
                    Agregar Libro
                </button>
            </Link>
            
        </div>
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
                                <Link href={`libros/editar/${libro.idLibro}`}>
                                    <Button>Editar Libro</Button>
                                </Link>
                                
                                <Button onClick={() => {eliminarLibro(libro.idLibro)}}>Eliminar Libro</Button>
                            </div>    
                            
                    </AnimeCard>
                )
                
            })
        }
    </> 
)
}