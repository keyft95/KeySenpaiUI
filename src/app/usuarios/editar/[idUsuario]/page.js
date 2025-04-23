'use client'

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";



export default function EditarUsuario({params}) {
    
    const {idUsuario} = use(params);
    const baseUrl = "http://localhost:8080/";
    const router = useRouter();
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        const endpoint = `misUsuarios/${idUsuario}`

        fetch(baseUrl + endpoint, {
            method: "GET"
        
        })
        .then((response) => {return response.json()})
        .then((apiData) => {
            console.log(apiData);
            setUsuario(apiData.data[0])
        })

    }, [])

    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setUsuario((values) => {return {...values, [name]: value}})  
    }

    const handledSubmit = (event) => {
        event.preventDefault();
        console.log(usuario)

        const endpoint = `misUsuarios/${idUsuario}`; 

        fetch(baseUrl+endpoint, {
            method: "PUT",
            body: JSON.stringify(usuario),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response) => {return response.json()})
        .then((apiData) => {
            console.log(apiData);
            alert("Se ha editado el Usuario")
            router.push("/usuarios")//nombre de la carpeta donde quiero redireccionar
        })
    }


        
    return (
        <>
            <h1 className="m-5 text-2xl text-center text-rose-300">Editar Usuario</h1>
            <form onSubmit={handledSubmit} className="flex flex-col px-5 gap-3">
                <Input value={usuario.nombre || ""} id="txtNombre" text="Nombre" name="nombre" onChange={handleChange}/>
                <Input value={usuario.nombrePerfil || ""} id="txtNombrePerfil" text="Nombre Perfil" name="nombrePerfil"onChange={handleChange}/>
                <Input value={usuario.apellidos || ""} id="txtApellidos" text="Apellidos" name="apellidos"onChange={handleChange}/>
                <Input value={usuario.edad || ""} id="txtFechaCumpleanos" text="Fecha de cumpleaños" name="edad"onChange={handleChange}/>
                <Input value={usuario.correo || ""} id="txtCorreo" text="Correo" name="correo" onChange={handleChange}/>
                <Input value={usuario.fotoPerfil || ""} id="txtFotoPerfil" text="Foto Perfil" name="fotoPerfil"onChange={handleChange}/>
                
                
                <Button>
                    Agregar Usuario
                </Button>
            </form>
        </>
       
    )
    
}