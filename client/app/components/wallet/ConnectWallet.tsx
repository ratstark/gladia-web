"use client"
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import { useEffect, useState, useCallback } from 'react'
import ControllerConnector from '@cartridge/connector/controller'
import { StoneButton } from '../StoneButton'

export function ConnectWallet() {
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()
    const { address, connector } = useAccount()
    const controller = connectors[0] as ControllerConnector
    const [username, setUsername] = useState<string>()

    const openInventory = useCallback(() => {
        try {
            if (!controller?.controller) {
                throw new Error("Controller not initialized");
            }
            controller.controller.openProfile("inventory");
        } catch (error) {
            console.error("Failed to open inventory:", error);
        }
    }, [controller])

    useEffect(() => {
        if (!address) return
        controller.username()?.then((n) => setUsername(n))
    }, [address, controller])

    return (
        <div>
            {address ? (
                <>
                    <StoneButton onClick={() => disconnect()}>Disconnect</StoneButton>
                    <StoneButton onClick={openInventory}>Inventory</StoneButton>
                </>
            ) : (
                <StoneButton onClick={() => connect({ connector: controller })}>
                    Connect
                </StoneButton>
            )}
        </div>
    )
}