import Image from "next/image";
import Link from "next/link";
import React from "react";
import { notFound } from "next/navigation";


interface PageProps {
    params: {
      slug: string[];
    };
  }

  async function getPageFromParams(params: PageProps["params"]) {
    const slug = params?.slug?.join("/");    

    const res = await fetch('http://localhost:8080/api/'+ slug)
    console.log("aaaaa"+res.ok)
    
    
    if (!res.ok) {
        null
      }
     
      return res.json()
    
  }

interface Props {
    Employee: {
        id: number;
        firstName: string;
        lastName: string;
        gender: string;
        joiningDate: string;
        retiringDate: string | null;
        noOfChildren: number;
    }
}


export default async function PagePage({ params }: PageProps) {

    const page = await getPageFromParams(params);

    if (!page || page.isArray) {
        notFound();
      }

    return (
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <h1 className="text-3xl font-bold mt-6">Lista de Empleados</h1>          
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {page.length > 0 ? (
                            Object.keys(page[0]).map((key) => (
                                <th key={key} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <h1 color="blue-gray" className="font-normal leading-none opacity-70">
                                        {key}
                                    </h1>
                                </th>
                            ))
                        ) : page === null ? (
                            <th colSpan={1}>Cargando datos...</th>
                        ) : (
                            <th colSpan={1}>No hay datos disponibles.</th>
                        )}
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <h1 color="blue-gray" className="font-normal leading-none opacity-70">
                                Acciones
                            </h1>
                        </th>
                    </tr>
                </thead>;

                <tbody>
                    {page.map((item: any, index: number) => {
                        const isLast = index === page.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={index}>
                                {Object.keys(item).map((key) => (
                                    <td key={key} className={classes}>
                                        <h1 color="blue-gray" className="font-normal">
                                            {item[key]}
                                        </h1>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    
        </div>
    );
};