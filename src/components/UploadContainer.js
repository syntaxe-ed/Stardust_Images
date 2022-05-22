import React from "react";
import DataTable from "./DataTable";
import NewItem from "./NewItem";

function UploadContainer(props) {
    let value = null;
    switch(props.action) {
        case("add"):
            value = <NewItem category={props.category} />
            break;
        case("edit"):
            value = <DataTable category={props.category} />
        default:
            break;
    }

    return (
        <div>
            {value}
        </div>
    );
}

export default UploadContainer