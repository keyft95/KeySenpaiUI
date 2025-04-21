'use client'

import Input from "@/components/Input"
import {useState} from "react"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"


export default function AddLibro(){

    // "nombreJapones": "",
    // "nombreIngles": "",
    // "nombreEspanol": "",
    // "sinopsis": "",
    // "estadoLibro": "",
    // "anno": "",
    // "tipoLibro": "",
    // "imgPrincipal": "",
    // "ordenDeVisualizacion": ""

    const router = useRouter();
    const [newLibro, setNewLibro] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setNewLibro((values) => {return {...values, [name]: value}})  
    }

    const handledSubmit = (event) => {
        event.preventDefault();
        console.log(newLibro)

        const baseUrl = "http://localhost:8080/";
        const endpoint = "libros"; 

        fetch(baseUrl+endpoint, {
            method: "POST",
            body: JSON.stringify(newLibro),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {return response.json()})
        .then((apiData) => {
            console.log(apiData);
            alert("Se ha creado el Libro")
            router.push("/libros")//nombre de la carpeta donde quiero redireccionar
        })
    }
    return(
        <>
            <h1 className="m-5 text-2xl text-center text-rose-300">Agregar Libro</h1>
            <form onSubmit={handledSubmit} className="flex flex-col px-5 gap-3">
                <Input id="txtNombreJ" text="Nombre Japonés" name="nombreJapones" onChange={handleChange}/>
                <Input id="txtNombreE" text="Nombre Español" name="nombreEspanol"onChange={handleChange}/>
                <Input id="txtNombreI" text="Nombre Inglés" name="nombreIngles"onChange={handleChange}/>
                <Input id="txtSinopsis" text="Sinopsis" name="sinopsis"onChange={handleChange}/>
                <Input id="txtImage" text="Imagen Principal" name="imgPrincipal"onChange={handleChange}/>
                <Input id="txtOrdenDeVisualizacion" text="Orden de Visualizacion" name="ordenDeVisualizacion"onChange={handleChange}/>
                <Input id="txtAnno" text="Fecha de publicacion" name="fechaDePublicacion"onChange={handleChange}/>
                <select name="estadoLibro" onChange={handleChange} className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                    <option value="">Estado</option>
                    <option value="ENPROGRESO">En Progreso</option>
                    <option value="FINALIZADO">Finalizado</option>
                    <option value="HIATUS">Hiatus</option>
                </select>
                <select name="tipoLibro" onChange={handleChange} className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                    <option value="">Tipo de Libro</option>
                    <option value="MANGA">Manga</option>
                    <option value="MANHWA">Manhwa</option>
                   
                </select>
                
                <Button>
                    Agregar Libro
                </Button>
            </form>
        </>

    )
}