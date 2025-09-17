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
import { FaEdit, FaTrash } from "react-icons/fa";
import "./style.css"

const AnnouncementsTable = () => {

    const [data, setData] = useState([]);

    // Helper to define columns more easily
    const columnHelper = createColumnHelper();

    const navigate = useNavigate();

    // Function triggered when "Edit" button is clicked
    const handleEdit = (row) => {
        console.log("Edit clicked for row:", row);
        navigate(`/announcements/${row.id}`);

    };

    // Function triggered when "Delete" button is clicked
    const handleDelete = async (row) => {
        if (window.confirm("Are you sure you want to delete this announcement?")) {
            await api.announcements.delete(row.id);
            // Refresh table after delete
            setData(prev => prev.filter(item => item.id !== row.id));
        }
    };

    // Define table columns
    const columns = useMemo(
        () => [
            // Title column
            columnHelper.accessor("title", { header: "Title" }),

            // Publication Date column
            columnHelper.accessor("publicationDate", {
                header: "Publication Date",
                cell: info => {
                    const date = new Date(info.getValue());
                    // Format date and time
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

            // Last Update column
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

            // Categories column
            columnHelper.accessor("categories", {
                header: "Categories",
                cell: info => {
                    const categories = info.getValue();
                    return Array.isArray(categories) ? categories.join(", ") : "";
                }
            }),

            // Actions column (Edit and Delete buttons)
            columnHelper.display({
                id: "actions",
                header: "Actions",
                cell: info => (
                    <div className="action-buttons" >
                        <button onClick={() => handleEdit(info.row.original)} title="Edit">
                            <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(info.row.original)} title="Delete">
                            <FaTrash />
                        </button>
                    </div>
                )
            })
        ],
        [] // ensures columns are only created once
    );

    const [sorting, setSorting] = useState([
        { id: "lastUpdate", desc: true } // initially sort by lastUpdate descending
    ]);

    const table = useReactTable({
        data,
        columns,
        state: { sorting }, // Current sorting state
        onSortingChange: setSorting, // Function to update sorting
        getCoreRowModel: getCoreRowModel(), // Core row model
        getSortedRowModel: getSortedRowModel() // Sorted row model
    });

    // Fetch announcements from API when component mounts
    useEffect(() => {
        api.announcements.getList().then(data => setData(data));
    }, []);

    return (
        <div className="table-wrapper">
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
        </div>
    );
};

export default AnnouncementsTable