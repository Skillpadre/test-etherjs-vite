import React, { useEffect, useState } from 'react'

const Network = ({ provider }) => {

    return (
        <>
            <div className="network-ui">
                <div className="network-content">
                    <p>🕸️ {provider.name || " "}</p>
                </div>
            </div>
        </>
    );
}

export default Network
