import React from 'react';

const SendEth = ({balance, networkName,symbol,func,loader,tx}) => {
    return (
        <>
            <div className="send-ui">
                <h2>Wallet dApp</h2>
                <p className="send-wallet-amount"> <span className="send-current-balance"></span></p>
                <table>
                    <tbody>
                        <tr>
                            <td className="label-group">
                                Balance {networkName} :{" "}
                            </td>
                            <td>
                                {balance} {symbol}
                            </td>
                        </tr>
                        <tr>
                            <td className="label-group">
                                <label htmlFor="input-amount-eth">Address :{" "}</label>
                            </td>
                            <td>
                                <input id="input-address-receiver" type="text" onChange={e => tx.to = e.target.value} placeholder="address" />
                            </td>
                        </tr>
                        <tr>
                            <td className="label-group">
                                <label htmlFor="input-address-receiver">Amount :{" "}</label>
                            </td>
                            <td>
                                <input id="input-amount-eth" type="number" step="0.1" onChange={e => tx.amount = e.target.value} placeholder="Amount" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="group-send-btn">
                    <button className="button-send" onClick={func}>Send</button>
                    {/* If Hash Show Hash sinon hide */}
                    {
                        (loader && !tx.isMined)
                        &&
                        <div>
                            <Loader
                                type="ThreeDots"
                                color="#00BFFF"
                                height={50}
                                width={50}
                            />
                        </div>
                    }
                    {
                        (tx.txHash.length > 0)
                        &&
                        <a href={explorerAddress + "/tx/" + tx.txHash}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <p>Show transaction: {tx.txHash}</p>
                        </a>
                    }
                </div>
            </div>
        </>
    );
}

export default SendEth;
