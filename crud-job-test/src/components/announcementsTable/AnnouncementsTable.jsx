import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/classAPI";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel
} from "@tanstack/react-table";
import "./style.css"

const AnnouncementsTable = () => {

    const [data, setData] = useState([]);

    const columnHelper = createColumnHelper();

    const navigate = useNavigate();

    const handleEdit = (row) => {
        console.log("Edit clicked for row:", row);
        navigate(`/announcements/${row.id}`);

    };

    const columns = useMemo(
        () => [
            columnHelper.accessor("title", { header: "Title" }),
            columnHelper.accessor("publicationDate", {
                header: "Publication Date",
                cell: info => {
                    const date = new Date(info.getValue());
                    return date.toLocaleString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                    });
                }
            }),
            columnHelper.accessor("lastUpdate", {
                header: "Last Update",
                cell: info => {
                    const date = new Date(info.getValue());
                    return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric"
                    });
                }
            }),
            columnHelper.accessor("categories", {
                header: "Categories",
                cell: info => info.getValue().join(", ")
            }),
            columnHelper.display({
                id: "actions",
                header: "Actions",
                cell: info => (
                    <button onClick={() => handleEdit(info.row.original)}>Edit</button>
                )
            })
        ],
        []
    );

    const [sorting, setSorting] = useState([
        { id: "lastUpdate", desc: true }
    ]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
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
                            <th
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                                style={{ cursor: "pointer" }}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {{
                                    asc: " ▲",
                                    desc: " ▼"
                                }[header.column.getIsSorted()] ?? null}
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