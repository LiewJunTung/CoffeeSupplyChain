# Coffee Supply Chain

## Setup and deployment
1. Create .mnemonic file in the root and add wallet phrase
1. Create .infuraKey file in the root and add infura project ID for rinkeby
1. Modify code in 
   1. /contracts/
   1. index.html
   1. src/
1. Run test via `truffle test` or `truffle test --network ganache` if using ganache
1. Deploy contract to Rinkeby via `truffle deploy --network rinkeby`
1. Bundle website via `./deploy.sh`
1. Deploy to IPFS via `ipfs add -r dist/`, save the hash appears next to `dist/`
1. Add the IPFS to IPNS via `ipfs name publish <hash>`

## Node Version Number
v12.16.3

## Truffle Version Number 
v5.3.10

## Web3 Version Number
0.20.6


## UML
### Activity Diagram
![activity](https://plantuml.com/plantuml/svg/HOz12iCm30JlVeMFxHVIIo2bq6j_eDWoDerZ8yc1WXzVapRnJJkxIAkH1KXAN9IgUahE8UggTjZ00oWYDJ1ue0rPdeBnShsf8LCooDmrcFSfmDfZhleUM2ZCHTA-Q2wVCyS-v1vyeK1OVkS83OODkpcbbSk_YqCn_h1OKbOZhhRzy0K0 "activity")
### Class Diagram
![class](https://plantuml.com/plantuml/svg/bLVTJjim6BtFKrZYfXMK1wZOn3Q4G4A0Mkwc2Rc9sreaTcGxPHMZppx_rt5malQg_ixnP_jynp-vvW8oqLHbbkKbv1pSGbOXjg0buk0Z0_8t0qosva35RC2GVXG5AYOmpsb3n1p0ec18Pi2aG7zHCPq3j4D4jBeiK4LtupjHKkvDnybKXyu1vZOGft04sHnWC4HaF4Ujp8V1ZWVPKSq-IVgq4Zwz4xWgaPUFChoHCSGyrm8l31A-Hao3V8lhIIG7e6MXmOjOA43GkqQ-K4p7lM3KjDfZAnsV7B2Yj8oaESx8ZTDHKNGcdw0UmEiehfFl5oMyiHvCMz2nJZAXJtsw3LtNm8W-r6F5GOvJFCf_6D7P6RA7vZIzmLmml6e47P0r89waR3Z0wU86lGDzmsYFn6DeJkNkG8TnAPpM_Kmdzm89YCiX2plMIKBxrAUhxBe64ljGZxw372TkbFymehEJjOVcDGskf3C5Juw2okFno_HdDlqewXRo0PwRohAfQtaYR24cTaAqTPQ16kxL3Q2XfixdeC6s4loj2LeVQupAuXDWWIe-1nMiQqms4uM3Rz_1lGnFkyGxwK7Azbs-iYRP_FupjKM_Wso7k90kqGmvayWLpupcShuz19Y_fT5RofQmH2buAM-l92OlWJgTUO5oX7SzysfOBkkL8fo3N9w9WZLvUAAyuRBqZQtHHaayUVKrkW2lwhR6H5toZx2IPZ2YWaeQYUrR-3rPKrP1WIdfOJr8WcYAtamFb6mIf9hHGYxZaGh48zGjfJPLZ9RYKLd21CHHMNO5g1dEKPkuQlQf5BAE2OYP6gQcPIkOWDT8v5k5_MpMwk50q33fvPssIAsZmsnKjuzM23ArOTqESXjNRYBr6fgg_B9xXaXJWQM0mXtZValfbjy_fgKtY_vhTuR-hxQ1-MCyh_yxWvkEpirgI3DbjIexPFl8Q1yd-jovlsa_xew-wiD2TqTGOEm48pPr3CT-rhYrifgINy1NzWw1vwCPTLWTWBeUSrCM7IoEbtAyNcOlbZYUspTJ4FUdjYo2TiniHisjavcxv-hoClmy2gBXapK8Hw-k00aV25duoNNrRpOBxvUizHhkeF6xhaDelKGwgFjIwG3X3KSbfkpO2Pe2PDar8eNyWlmF "class")

### Sequence Diagram
![sequence](https://plantuml.com/plantuml/svg/TP9BheCm34Ndh2B3rm4Ro01LQbMfqxS3rnWHjK0KEqZTVIdvDFGpubh7dvihzYpWn0-tghABC6WiZA8EKzSHAM25gzh04xY1t1Dsgzh0es5nvk9bMZlQLxbf-oS1SmjRNDHl3aRsyGn6NLM0OcOGIhPo7Ps4Jzq4h5KFRYQMiz3mj_kWrar8pByeuFK7WhQDf7XVtOGshIx-dZ2zEynrcSncIuf3A-wDZOloM0uhYRefflN2aSnCd_VBUqMCCTaaolFME-o1l-pA9a8Wps32k5OT2VPnOazZk_nQ3m00 "sequence")

### State Diagram
![state](https://plantuml.com/plantuml/svg/VPG_QyCm4CLtVGhXgIreiJrfC86MqcwX7ai7nLQmgHC7IGwKqkzU_Jlvb8HayUbtzzvXFv6DDaAPvJ0HOYiZwQjG1wceqBG8PK72azDHXogRB6-CbcWMaJUXpb8RsKV8cjZC3AiRXjMLeITRDNTIwsHOWcELETOt7EihHq-seljETXNOrT7kPTH6ZRl5pE43eND1qC4veUDbArjIimQFNYqgxsugxwpolNQUUWopRV3XFwGHunHJXqD1e78-K6Um7SRJIMR-De8q6ioVvwDUu4h1eI1GEH-eCxXTL3S85ouOiYODai-dBygQ630XQTT-BsNSvClMyOB-4cf_LiIQzHOw56yYmfmEeNmtyl3mwATIapNhdLlb9KESqrCeaJurxLm8VnLN3A1LsYUMUMnluQnQCKaagbcYd8g-HwA8MUEZTmJ77p2dk-K7QHopdHZdXSQzNMnngcs1XO6xq3ivdgCu1RRoout0xRkdd1s7X1bgSBgNfXkYcloHZJpszY_h7m00 "state")

## Modification
1. Removed UPC field in SupplyChain.sol
2. Made Distributor as payable instead of Customer. Reasons being that the Distributor is the one paying the farmer, not the customer. And the refund should be given back to the Distributor instead.

## Libraries
1. web3.min.js - a web3 library to connect to web3
2. jquery - for simple html manipulation
3. truffle-hdwallet-provider - for providing truffle config the account needed to deploy contract

## Information
### Contract Address
0xE1F4a2aE4D04271D3A55f7e63791E57f4411CF6C

### Transaction Hash
0xb46e90b528dfda589f6e6a3192a1990d2bf8243110be27e51b4ef07047368e55

### Link 
https://k51qzi5uqu5dkxr1mbm7vbzjq1dbti8c7hiztwogdvsfczol656m3zifpszi75.ipns.dweb.link/
