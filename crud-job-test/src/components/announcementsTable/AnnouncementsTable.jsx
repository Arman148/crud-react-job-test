import React, { useState, useEffect, useMemo } from "react";
import api from "../../api/classAPI";
import { useTable, ColumnDef, flexRender, getCoreRowModel } from "@tanstack/react-table";

const Table = () => {


    useEffect(() => {
        api.announcements.getList();
        //api.announcements.create("title 11", "03/27/2023 9:32", "03/29/2023 00:00", ["city", "health", "sport"]);
        //api.announcements.update(11, "title 11 - the new title", "03/27/2023 9:32", "03/30/2023 8:52", ["health", "sport", "culture"]);

    })

    return (
        <div>

        </div>
    );
};

export default Table