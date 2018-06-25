# private-block-explorer

#### This transaction explorer consumes an API that makes a request to a server that is connected to private ethereum network.

___

**Point this application's requests to the RPC port of your geth node. Probably port 8545 of server.**

___
###### The server uses Web3 to interact with the contract and calls a getTransaction function, where the input is the transactionHash 


###### The server is connect using the WalletProvider by passing in the keystore value and password.


###### This prototype is functional with the `health_s` repo node server and `health` repo contract deployed on a private network running on AWS EC2.


http://s3-us-west-2.amazonaws.com/private-block-explorer/block_explorer.html 

