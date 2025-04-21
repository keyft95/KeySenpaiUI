'use client'

import AnimeCard from "@/components/AnimeCard";
import { useEffect, useState } from "react";

export default function Animes() {

    const [animes, setAnimes] = useState([]);

    useEffect(()=>{
        let baseUrl = "http://localhost:8080/";
        let endpoint = "animes";

        fetch(baseUrl+endpoint, {
            method: "GET",
            // body: JSON.stringify(data)
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            setAnimes(apiData.data[0]);

        })

    }, [])

return (
    <>
        <h1 className="text-center text-3xl font-bold">Animes</h1>
        <AnimeCard/>
        {
            animes.map((anime)=>{
                return <AnimeCard key={anime.idAnime} titulo={anime.nombreEspanol} imagen={anime.imgPrincipal} description={anime.sinopsis}/>
        })}
    </> 
)
}