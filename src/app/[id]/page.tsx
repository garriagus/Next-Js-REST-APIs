"use client"

import { notFound } from "next/navigation";
import { useRouter } from 'next/router'
 

interface PageProps {
    params: {
        slug: string[];
    };
}

async function getPageFromParams(params: PageProps["params"]) {

    const router = useRouter()
    try {
        const res = await fetch(process.env.SERVER as string + router, { next: { revalidate: 3600 } })
        const data = await res.json()
        return data
    }
    catch (err) {
        console.log(err);
    }
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
}



export default async function Page({ params }: PageProps) {

    const page = await getPageFromParams(params);

    if (!page) {
        notFound();
    }

    return (
        <main>
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
        </main>
    );
};