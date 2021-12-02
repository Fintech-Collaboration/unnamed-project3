const coin_cost   = document.getElementsByName('coin_cost')[0].content;
const ether_price = document.getElementsByName('ether_price')[0].content;
const noAccountAddress = "0x00...";


function hex2int(hex) {
    return parseInt(Number(hex), 10);
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(cookie_name) {
  const re = new RegExp(`(?<=${cookie_name}=)[^;]*`);
  try{
    return document.cookie.match(re)[0];
  }catch{
    return "this-cookie-doesn't-exist";
  }
}

function sortMeta(data) {
    return document.getElementsByName(data)[0].content.split("//s");
}

function subAddress(addr, hash_type) {
  const sub_address = `${addr.substring(0, 5)}...${addr.substring(addr.length-4, addr.length)}`

    // Valid hash_type values are "tx", "address"
    if (hash_type) {
      return `<a href="https://kovan.etherscan.io/${hash_type}/${addr}" target="_blank">${sub_address}</a>`
    }
    else {
      return sub_address
    }
}

function myEtherPrice() {
    setTimeout(function() {  
        const rateDisplay = document.getElementById("current-market-value")
 
        const d = new Date();
        const n = d.toLocaleTimeString();
        console.log(ether_price);
        fetch(ether_price).then(
            response => {
                return response.json();
        }).then(
            users => {
                var ethusd = users["result"]["ethusd"]
                eth_rate = parseFloat(coin_cost) / parseFloat(ethusd);
                if (rateDisplay) {
                    rateDisplay.textContent = `VXCN Current Exchange Rate: ${eth_rate.toFixed(6)} ETH`;
                };
            }
        );
        // myEtherPrice();
    }, 2500)
}

function myClock() {
    setTimeout(function() {   
        const d = new Date();
        const n = d.toLocaleTimeString();
        setCookie("timeExecuted", n, 364)
        myClock();
    }, 1000)
}

function updateDepositCurrencyCost() {
    const depositCurrencyCost = document.getElementById("deposit_currency_cost");
    const depositCoinCount = document.getElementById("deposit_coin_count").value;

    depositCurrencyCost.value = (parseFloat(depositCoinCount) * parseFloat(coin_cost)).toFixed(2);

    _defaultWithdrawCoin();
}

function updateDepositCoinCount() {
    const depositCurrencyCost = document.getElementById("deposit_currency_cost").value;
    const depositCoinCount = document.getElementById("deposit_coin_count");

    depositCoinCount.value = (parseFloat(depositCurrencyCost) / parseFloat(coin_cost)).toFixed(6);

    _defaultWithdrawCoin();
}

function updateWithdrawCurrencyCost() {
    const withdrawCurrencyCost = document.getElementById("withdraw_currency_cost");
    const withdrawCoinCount = document.getElementById("withdraw_coin_count").value;

    withdrawCurrencyCost.value = (parseFloat(withdrawCoinCount) * parseFloat(coin_cost)).toFixed(2);

    _defaultDepositCoin();
}

function updateWithdrawCoinCount() {
    const withdrawCurrencyCost = document.getElementById("withdraw_currency_cost").value;
    const withdrawCoinCount = document.getElementById("withdraw_coin_count");
    console.log("withdrawing")

    withdrawCoinCount.value = (parseFloat(withdrawCurrencyCost) / parseFloat(coin_cost)).toFixed(6);

    _defaultDepositCoin();
}

function _defaultWithdrawCoin() {    
    const withdrawCoinCount = document.getElementById("withdraw_coin_count");
    const withdrawCurrencyCost = document.getElementById("withdraw_currency_cost");

    withdrawCoinCount.value = 0.00;
    withdrawCurrencyCost.value = 0.00;
}

function _defaultDepositCoin() {
    const depositCoinCount = document.getElementById("deposit_coin_count");
    const depositCurrencyCost = document.getElementById("deposit_currency_cost");

    depositCoinCount.value = 0.00;
    depositCurrencyCost.value = 0.00;
}

const contract_address   = document.getElementsByName('contract_address')[0].content;
const tx_hash            = sortMeta('tx_hash');
const tx_contractAddress = sortMeta('tx_contractAddress');
const tx_from            = sortMeta('tx_from');
const tx_to              = sortMeta('tx_to');
const tx_value           = sortMeta('tx_value');
const tx_gasUsed         = sortMeta('tx_gasUsed');
const tx_date            = sortMeta('tx_date');
const tx_time            = sortMeta('tx_time');

myClock();
myEtherPrice();
