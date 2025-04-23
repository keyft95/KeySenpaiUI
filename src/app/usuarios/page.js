'use client'

import UsuarioCard from "@/components/UsuarioCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [usuarioText, setUsuarioText] = useState("");

    const buscarUsuario = (event) => {

       event.preventDefault();
        console.log("Usuario", usuarioText);

        let baseUrl = "http://localhost:8080/";
        let endpoint = `misUsuarios/search/${usuarioText}`;
        if(usuarioText=="") {
            endpoint = "misUsuarios"; 
        }

        fetch(baseUrl+endpoint, {
            method: "GET",
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            setUsuarios(apiData.data);

        })

    }

    const eliminarUsuario = (id) => {

        let baseUrl = "http://localhost:8080/";
        let endpoint = `misUsuarios/${id}/`;

        fetch(baseUrl+endpoint, {
            method: "DELETE",
           
        })
        .then(() => {
            setUsuarios((prevUsuarios) => 
                prevUsuarios.filter((usuario) => usuario.id !== id)  
            );
        });
        
        alert("Se ha eliminado el usuario");
    }

    useEffect(()=>{
        let baseUrl = "http://localhost:8080/";
        let endpoint = "misUsuarios";

        fetch(baseUrl+endpoint, {
            method: "GET",
           
        })
        .then((response)=>{return response.json()})
        .then((apiData)=>{
            let usuarioTemporal = apiData.data[0];
            usuarioTemporal = usuarioTemporal.filter((usuario) => {return usuario.activo==true})
            setUsuarios(usuarioTemporal);

        })

    }, [])



return (
    <>
        <h1 className="text-center text-3xl font-bold text-rose-300 m-5">Usuarios</h1>
        <div className="flex justify-end">
                <Link href="/usuarios/add">
                    <button  type="button" className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-rose-300 dark:hover:bg-rose-400 dark:focus:ring-rose-500">
                        Agregar Usuario
                    </button>
                </Link>
                
            
        </div>
        <h2 className="m-5">Buscar Usuario</h2>
        <form onSubmit={buscarUsuario} className="flex flex-col px-5 gap-3">
            <Input id="txtUsuario" text="Nombre" name="nombre" onChange={(event) => {setUsuarioText(event.target.value)}}/>
            <Button>Buscar Usuario</Button>

        </form>
        
        {
            usuarios.map((usuario)=>{
                return (
                    <UsuarioCard 
                            key={usuario.id} 
                            nombre={usuario.nombre} 
                            nombrePerfil={usuario.nombrePerfil}
                            apellidos={usuario.apellidos}
                            edad={usuario.anno}
                            correo={usuario.correo}
                            fotoPerfil={usuario.fotoPerfil} >
                            <div className="flex gap-3 my-3">
                                <Button onClick={() => eliminarUsuario(usuario.id)}>Eliminar Usuario</Button>
                                <Link href={`usuarios/editar/${usuario.id}`}>
                                     <Button>Editar usuario</Button>
                                </Link>
                                
                                <Button>Ver Usuario</Button>
                               
                                
                            </div>    
                            
                    </UsuarioCard>
                )

                
             })
        }
    </> 
)
}