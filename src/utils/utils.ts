import {ethers} from "ethers";

export const isEthAddress = (address: string) => ethers.utils.isAddress(address);