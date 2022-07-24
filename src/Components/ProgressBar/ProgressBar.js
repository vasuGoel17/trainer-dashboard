import React from 'react'


function ProgressBar(props) {
    return (
        <div>
            <div >
                <div style={{ display: "flex" }}>
                    <div style={{ width: "50px", position: "relative" }}>{props.children}</div>
                </div>
            </div>
        </div>
    )
}

export default ProgressBar