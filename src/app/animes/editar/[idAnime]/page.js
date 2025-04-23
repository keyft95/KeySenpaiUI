'use client'

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";



export default function EditarAnime({params}) {
    
    const {idAnime} = use(params);
    const baseUrl = "http://localhost:8080/";
    const router = useRouter();
    const [anime, setAnime] = useState({})

    useEffect(() => {
        const endpoint = `animes/${idAnime}`

        fetch(baseUrl + endpoint, {
            method: "GET"
        
        })
        .then((response) => {return response.json()})
        .then((apiData) => {
            console.log(apiData);
            setAnime(apiData.data[0])
        })

    }, [])

    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setAnime((values) => {return {...values, [name]: value}})  
    }

    const handledSubmit = (event) => {
        event.preventDefault();
        console.log(anime)

        const endpoint = `animes/${idAnime}`; 

        fetch(baseUrl+endpoint, {
            method: "PUT",
            body: JSON.stringify(anime),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {return response.json()})
        .then((apiData) => {
            console.log(apiData);
            alert("Se ha editado el anime")
            router.push("/animes")//nombre de la carpeta donde quiero redireccionar
        })
    }


        
    return (
        <>
            <h1 className="m-5 text-2xl text-center text-rose-300">Editar Anime</h1>
            <form onSubmit={handledSubmit} className="flex flex-col px-5 gap-3">
                <Input value={anime.nombreJapones|| ""} id="txtNombreJ" text="Nombre Japonés" name="nombreJapones" onChange={handleChange}/>
                <Input value={anime.nombreEspanol|| ""} id="txtNombreE" text="Nombre Español" name="nombreEspanol"onChange={handleChange}/>
                <Input value={anime.nombreIngles|| ""} id="txtNombreI" text="Nombre Inglés" name="nombreIngles"onChange={handleChange}/>
                <Input value={anime.sinopsis|| ""} id="txtSinopsis" text="Sinopsis" name="sinopsis"onChange={handleChange}/>
                <Input value={anime.imgPrincipal|| ""} id="txtImgPrincipal" text="Imagen Principal" name="imgPrincipal"onChange={handleChange}/>
                <Input value={anime.ordenDeVisualizacion|| ""} id="txtOrdenDeVisualizacion" text="Orden de Visualizacion" name="ordenDeVisualizacion"onChange={handleChange}/>
                <Input value={anime.anno|| ""} id="txtAnno" text="Fecha de publicacion" name="anno"onChange={handleChange}/>
                <select value={anime.estadoAnime|| ""} name="estadoAnime" onChange={handleChange} className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                    <option value="">Estado</option>
                    <option value="ENPROGRESO">En Progreso</option>
                    <option value="FINALIZADO">Finalizado</option>
                    <option value="HIATUS">Hiatus</option>
                </select>
                <select value={anime.tipoAnime|| ""} name="tipoAnime" onChange={handleChange} className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                    <option value="">Tipo de Anime</option>
                    <option value="ANIME">Anime</option>
                    <option value="PELICULA">Pelicula</option>
                    <option value="OVA">Ova</option>
                    <option value="ESPECIAL">Especial</option>
                </select>
                
                <Button >
                    Agregar cambios Anime
                </Button>
            </form>
        </>
       
    )
    
}