'use client'

import AnimeCard from "@/components/AnimeCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";

export default function Animes() {

    const [animes, setAnimes] = useState([]);
    const [animeText, setAnimeText] = useState("");

    const buscarAnime = (event) => {

       event.preventDefault();
        console.log("Anime", animeText);

        let baseUrl = "http://localhost:8080/";
        let endpoint = `animes/search/${animeText}`;
        if(animeText=="") {
            endpoint = "animes";
        }

        fetch(baseUrl+endpoint, {
            method: "GET",
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            setAnimes(apiData.data[0]);

        })

    }

    useEffect(()=>{
        let baseUrl = "http://localhost:8080/";
        let endpoint = "animes";

        fetch(baseUrl+endpoint, {
            method: "GET",
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            setAnimes(apiData.data[0]);

        })

    }, [])

return (
    <>
        <h1 className="text-center text-3xl font-bold text-rose-300 m-5">Animes</h1>
        <h2 className="m-5">Buscar Anime</h2>
        <form onSubmit={buscarAnime} className="flex flex-col px-5 gap-3">
            <Input id="txtAnime" text="Nombre" name="nombre" onChange={(event) => {setAnimeText(event.target.value)}}/>
            <Button>Buscar Anime</Button>

        </form>
        
        {
            animes.map((anime)=>{
                return (
                    <AnimeCard 
                            key={anime.idAnime} 
                            titulo={anime.nombreEspanol} 
                            imagen={anime.imgPrincipal} 
                            description={anime.sinopsis}>
                            <div className="flex gap-3 my-3">
                                <Button>Agregar a mi lista</Button>
                                <Button>Eliminar Anime</Button>
                                <Button>Editar</Button>
                            </div>    
                            
                    </AnimeCard>
                )

                
             })
        }
    </> 
)
}