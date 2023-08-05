
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
    console.log(slug.toLocaleLowerCase)
    const res = await fetch('http://192.168.0.4:8080/api/'+ slug)
    const employee = await res.json()
    const page = employee.find((page: { slugAsParams: string; }) => page.slugAsParams === slug);
  
    if (!page) {
      null;
    }
  
    return page;
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
    const res = await fetch('http://192.168.0.4:8080/api/employees')
    const employee = await res.json()

    if (!employee) {
        notFound();
      }

    return (
        <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            
            <h1 className="text-3xl font-bold mt-6">Lista de Empleados</h1>
            <table className="table-auto mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Apellido</th>
                        <th className="px-4 py-2">Género</th>
                        <th className="px-4 py-2">Fecha de Ingreso</th>
                        <th className="px-4 py-2">Fecha de Retiro</th>
                        <th className="px-4 py-2">Cantidad de Hijos</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((employee: any) => (
                        <tr key={employee.id}>
                            <td className="border px-4 py-2">{employee.id}</td>
                            <td className="border px-4 py-2">{employee.firstName}</td>
                            <td className="border px-4 py-2">{employee.lastName}</td>
                            <td className="border px-4 py-2">{employee.gender}</td>
                            <td className="border px-4 py-2">{employee.joiningDate}</td>
                            <td className="border px-4 py-2">{employee.retiringDate || '-'}</td>
                            <td className="border px-4 py-2">{employee.noOfChildren}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
