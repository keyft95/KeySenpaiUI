'use client'


import Input from "@/components/Input"
import {useState} from "react"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"

export default function AddUsuario(){
    
    // "nombre": "Jimmi",
//     "nombrePerfil": "Jimminator",
//     "apellidos": "Vila Ccopa",
//     "edad": "1994-05-19",
//     "correo": "jimmivco@hotmail.com",
//     "fotoPerfil": "sdfghcjhvdvhhfjfhfk"

    const router = useRouter();
    const [newUsuario, setNewUsuario] = useState({})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setNewUsuario((values) => {return {...values, [name]: value}})  
    }

    const handledSubmit = (event) => {
        event.preventDefault();
        console.log(newUsuario)

        const baseUrl = "http://localhost:8080/";
        const endpoint = "misUsuarios"; 

        fetch(baseUrl+endpoint, {
            method: "POST",
            body: JSON.stringify(newUsuario),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {return response.json()})
        .then((apiData) => {
            console.log(apiData);
            alert("Se ha creado el Usuario")
            router.push("/usuarios")//nombre de la carpeta donde quiero redireccionar
        })
    }
    return(
        <>
            <h1 className="m-5 text-2xl text-center text-rose-300">Agregar Usuario</h1>
            <form onSubmit={handledSubmit} className="flex flex-col px-5 gap-3">
                <Input id="txtNombre" text="Nombre" name="nombre" onChange={handleChange}/>
                <Input id="txtNombrePerfil" text="Nombre Perfil" name="nombrePerfil"onChange={handleChange}/>
                <Input id="txtApellidos" text="Apellidos" name="apellidos"onChange={handleChange}/>
                <Input id="txtFechaCumpleanos" text="Fecha de cumpleaños" name="edad"onChange={handleChange}/>
                <Input id="txtCorreo" text="Correo" name="correo" onChange={handleChange}/>
                <Input id="txtFotoPerfil" text="Foto Perfil" name="fotoPerfil"onChange={handleChange}/>
                
                
                <Button>
                    Agregar Usuario
                </Button>
            </form>
        </>

    )
}