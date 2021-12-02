import json

from web3 import Web3
from web3 import Account

from web3.auto.infura.kovan         import w3
from web3.gas_strategies.time_based import medium_gas_price_strategy

from django.conf import settings


def web3backend():
    # Account Credentials
    public_key  = settings.WALLET["VIXCOIN_OWNER_PUBLIC_KEY"]
    private_key = settings.WALLET["VIXCOIN_OWNER_PRIVATE_KEY"]
    account     = Account.privateKeyToAccount(private_key)


    # Alchemy KovanApp URL
    url  = settings.CONTRACT["ALCHEMY_URL_KEY"]
    web3 = Web3(Web3.HTTPProvider(url))

    # Token Contract
    contract_address = web3.toChecksumAddress(settings.CONTRACT["SMART_CONTRACT_ADDRESS"])
    abi_path         = settings.ABI_DIR(app="portfolio_manage", fn="VixcoinToken.json")

    with open(abi_path) as f:
        json_obj               = "\n".join(f.readlines()[1:])
        contract_address_token = json.loads(json_obj)["_contractAddress"]
        abi                    = json.loads(json_obj)["abi"]

    vxcn_token_contract        = web3.eth.contract(address=contract_address_token, abi=abi)

    # Crowdsale Contract
    contract_address = web3.toChecksumAddress(settings.CONTRACT["SMART_CONTRACT_ADDRESS"])
    abi_path         = settings.ABI_DIR(app="portfolio_manage", fn="VixcoinTokenCrowdsale.json")

    with open(abi_path) as f:
        json_obj                   = "\n".join(f.readlines()[1:])
        contract_address_crowdsale = json.loads(json_obj)["_contractAddress"]
        abi                        = json.loads(json_obj)["abi"]

    vxcn_token_crowdsale_contract  = web3.eth.contract(address=contract_address_crowdsale, abi=abi)

    return {
        "public_key":       public_key,
        "private_key":      private_key,
        "contract_address": settings.CONTRACT["SMART_CONTRACT_ADDRESS"].lower(),
        "account":          account,
        "vxcn_token_contract": vxcn_token_contract,
        "vxcn_token_crowdsale_contract": vxcn_token_crowdsale_contract,
    }
    
    