'use client'

import { notFound } from "next/navigation";

 
export default async Table(pathname) {

 console.log("este es el pathnmeeee"+pathname)

 const page = await fetch(process.env.SERVER + pathname).then((res) => res.json())
 
 
 if (!page) {
    notFound();
}

return (
    // Suponiendo que page es un array de objetos con propiedades: id, firstName, lastName, gender, joiningDate, retiringDate, noOfChildren, area, rfidKey

  
       
        <table className="w-full min-w-max table-auto text-left">
            <thead>
                <tr>
                    {Array.isArray(page) && page.length > 0 ? (
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


);
};