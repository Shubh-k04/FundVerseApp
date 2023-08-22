import React, {useContext, createContext} from 'react';

import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';

import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) =>{
    const { contract } = useContract('0xA3fDB55748E53Ea763Bd0828b13FE9d79996Bf99');
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();  //Connecting the smart wallet

    const publishCampaign = async (form) => {
        try{
            const data = await createCampaign([
                address,    //owner of the campaign
                form.title, //title of the campaign
                form.desc,  //description of the campaign
                form.target,    //target funding of the campaign
                new Date(form.deadline).getTime(),   //deadline of the campaign
                form.imageurl,  //url of the image
            ])

            console.log("contract call success",data)
        } catch(error) {
            console.log("contract call failed", error);
        }
    }

    return(
        <StateContext.Provider
            value = {{
                address,
                contract,
                createCampaign: publishCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext
(StateContext);