import React, { useState, useEffect, useMemo } from "react";
import api from "../../api/classAPI";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";

const AnnouncementsTable = () => {

    const [data, setData] = useState([]);

    const columnHelper = createColumnHelper();

    const columns = useMemo(
        () => [
            columnHelper.accessor("id", { header: "ID" }),
            columnHelper.accessor("title", { header: "Title" }),
            columnHelper.accessor("publicationDate", { header: "Publication Date" }),
            columnHelper.accessor("lastUpdate", { header: "Last Update" }),
            columnHelper.accessor("categories", { header: "Categories" })
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    useEffect(() => {
        api.announcements.getList().then(data => setData(data));
    }, []);

    console.log(data);

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AnnouncementsTable