import React, { use, useEffect } from "react";
import api from "../../api/classAPI";

const Table = () => {


    useEffect(() => {
        api.announcements.getList();
    })

    return (
        <div>

        </div>
    );
};

export default Table