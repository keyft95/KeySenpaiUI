'use client'

import AnimeCard from "@/components/AnimeCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Animes() {

    const [animes, setAnimes] = useState([]);
    const [animeText, setAnimeText] = useState("");
    const [usuarios, setUsuarios] = useState([]);

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

    const [usuarioId, setUsuarioId] = useState("");
    const[lista, setLista] = useState(""); 
    const getUsuarios = () => {

        let baseUrl = "http://localhost:8080/";
        let endpoint = "misUsuarios";

        fetch(baseUrl+endpoint, {
            method: "GET",
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            setUsuarios(apiData.data[0]);
            
            console.log(apiData);
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

        });

        getUsuarios();

    }, [])

    const agregarAnimeALista = (idAnime) => {


        let baseUrl = "http://localhost:8080/";
        let endpoint = "misAnimes";

        let request = {
            "estadoMiAnime": lista,
             "anime": {
                "idAnime": idAnime
            },
            "usuario": {
                "id": usuarioId
            }
            
           
        }
        

        fetch(baseUrl+endpoint, {
            method: "POST",
            body: JSON.stringify(request),
            headers: {
                "Content-Type" : "application/json"
            }
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
           alert("Se ha agregado el anime a su lista")
            
            console.log(apiData);
        })
    }

    const eliminarAnime = (id) => {

        let baseUrl = "http://localhost:8080/";
        let endpoint = `animes/${id}`;

        fetch(baseUrl+endpoint, {
            method: "DELETE",
           
        })
        .then(() => {
            setAnimes((prevAnimes) => 
                prevAnimes.filter((anime) => anime.idAnime !== id)  
            );
        });
        
        alert("Se ha eliminado el anime");
    }

    useEffect(()=>{
        let baseUrl = "http://localhost:8080/";
        let endpoint = "animes";

        fetch(baseUrl+endpoint, {
            method: "GET",
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            let animeTemporal = apiData.data[0];
            animeTemporal = animeTemporal.filter((anime) => {return anime.activo==true})
            setAnimes(animeTemporal);

        })

    }, [])


return (
    <>
        <h1 className="text-center text-3xl font-bold text-rose-300 m-5">Animes</h1>
        <div className="flex justify-end">
            <Link href="/animes/add">
                <button type="button" className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-300 dark:hover:bg-rose-400 dark:focus:ring-rose-500">
                    Agregar Anime
                </button>
            </Link>
            
        </div>
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
                            description={anime.sinopsis}
                    >
                             
                            <div className="flex gap-3 my-3 h-10">
                                <select onChange={(event) => (setAnimeId(event.target.value))} className="py-3 px-4 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                    <option>Escoja el anime</option>
                                    {
                                        usuarios.map((anime) => {
                                            return(
                                                <option key={anime.id} value={anime.id}>{anime.nombre}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select onChange={(event) => {setLista(event.target.value)}} className="py-3 px-4 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                    <option value="">Escoja la lista</option>
                                    <option value="PORVER">Por Ver</option>
                                    <option value="VIENDO">Viendo</option>
                                    <option value="TERMINADO">Terminado</option>
                                </select>
                                <Button onClick={() => {agregarAnimeALista(anime.idAnime)}}>Agregar a mi lista</Button>
                                <Button onClick={() => {eliminarAnime(anime.idAnime)}}>Eliminar Anime</Button>
                                <Link href={`animes/editar/${anime.idAnime}`}>
                                     <Button>Editar</Button>
                                </Link>
                               
                            </div>    
                            
                    </AnimeCard>
                )

                
             })
        }
    </> 
)
}