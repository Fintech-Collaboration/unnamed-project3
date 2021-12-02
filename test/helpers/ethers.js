export default function ether(n) {    
    return new web3.utils.toBN(web3.utils.toWei(n, "ether"));
}