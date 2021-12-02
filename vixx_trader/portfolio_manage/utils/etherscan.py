from django.conf import settings


def getLastEtherPriceUrl():
    url = "https://api-kovan.etherscan.io/api" +\
          "?module=stats"                      +\
          "&action=ethprice"                   +\
          f"&apikey={settings.ETHERSCAN['API_KEY']}"
    
    return url