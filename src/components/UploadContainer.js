import React from "react";

function UploadContainer(props) {
    let value = null;
    switch(props.action) {
        case("add"):
            switch(props.category){
                case("products"):
                    value = <h1>Test</h1>
                    break;
                case("pages"):
                    value = <h1>Test 2</h1>
                    break;
                case("images"):
                    value = <h1>Test 3</h1>
                    break;
                default:
                    break;
            }
            break;
        case("edit"):
            switch(props.category){
                case("products"):
                    value = <h1>Test 4</h1>
                    break;
                case("pages"):
                    value = <h1>Test 5</h1>
                    break;
                case("images"):
                    value = <h1>Test 6</h1>
                    break;
                default:
                    break;
            }
            break;
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