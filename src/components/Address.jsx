import React, { useEffect, useState } from 'react'

const Address = ({ signer, explorer, func }) => {
    return (
        <>
            <div className="wallet-ui">
                <p className="address-style truncat-text">
                    {
                        explorer &&
                        (
                            <a href={explorer + "/address/" + signer}
                                target="_blank"
                                rel="noreferrer"
                            >
                                ↗️{" "}
                            </a>
                        )
                    }
                    {signer}
                </p>
            </div>
            {!true &&
                <div className="container-nav">
                    <button id="connect-wallet"
                        className="connect-btn"
                        onClick={func}>
                        Connect
                    </button>
                </div>}
        </>
    )
}

export default Address
