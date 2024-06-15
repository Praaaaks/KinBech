import React from "react";

const CustomInput = (props) => {
    return(
        <div>
            <input
                type = { props.type }
                onChange = { props.onChange }
                name = { props.name }
                placeholder = { props.placeholder }
                className = { props.className }
                value = { props.value }
                accept={ props.accept }
                required></input>
        </div>
    )
}

export default CustomInput;