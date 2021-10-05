const NEW_STATE = -1
const HARVESTED_STATE = 0
const PROCESSED_STATE = 1
const PACKED_STATE = 2
const FOR_SALE_STATE = 3
const SOLD_STATE = 4
const SHIPPED_STATE = 5
const RECEIVED_STATE = 6
const PURCHASED_STATE = 7

class ItemInformation {
    constructor(resultBufferOne, resultBufferTwo){
        web3 = new Web3(App.web3Provider);
        this.sku = resultBufferOne[0]
        this.upc = resultBufferOne[1]
        this.ownerID = resultBufferOne[2]
        this.originFarmerID = resultBufferOne[3]
        this.originFarmName = resultBufferOne[4]
        this.originFarmInformation = resultBufferOne[5]
        this.originFarmLatitude = resultBufferOne[6]
        this.originFarmLongitude = resultBufferOne[7]
        this.productID = resultBufferTwo[2]
        this.productNotes = resultBufferTwo[3]
        this.productPrice = web3.fromWei(resultBufferTwo[4], 'ether')
        
        this.itemState = Number(resultBufferTwo[5])
        this.initItemStateText()
        this.distributorID = resultBufferTwo[6]
        this.retailerID = resultBufferTwo[7]
        this.consumerID = resultBufferTwo[8]
    }

    initItemStateText(){
        switch (this.itemState) {
            case HARVESTED_STATE: 
                if (this.originFarmerID == "0x0000000000000000000000000000000000000000") {
                    this.itemStateText = "NEW"
                } else {
                    this.itemStateText = "HARVESTED"
                }
            
                break;
            case PROCESSED_STATE: this.itemStateText = "PROCESSED"; break;
            case PACKED_STATE: this.itemStateText = "PACKED"; break;
            case FOR_SALE_STATE: this.itemStateText = "FOR_SALE"; break;
            case SOLD_STATE: this.itemStateText = "SOLD"; break;
            case SHIPPED_STATE: this.itemStateText = "SHIPPED"; break;
            case RECEIVED_STATE: this.itemStateText = "RECEIVED"; break;
            case PURCHASED_STATE: this.itemStateText = "PURCHASED"; break;
            default: this.itemStateText = "??"
        }
    }
}

App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    getItemInformation: async function() {
        App.readForm()
        const itemInformation = new ItemInformation(await App.fetchItemBufferOne(), await App.fetchItemBufferTwo())
        $("#ownerID").val(itemInformation.ownerID)
        $("#originFarmerID").val(itemInformation.originFarmerID)
        $("#originFarmName").val(itemInformation.originFarmName);
        $("#originFarmInformation").val(itemInformation.originFarmInformation);
        $("#originFarmLatitude").val(itemInformation.originFarmLatitude);
        $("#originFarmLongitude").val(itemInformation.originFarmLongitude);
        $("#productNotes").val(itemInformation.productNotes);
        $("#productPrice").val(itemInformation.productPrice);
        $("#distributorID").val(itemInformation.distributorID);
        $("#retailerID").val(itemInformation.retailerID);
        $("#consumerID").val(itemInformation.consumerID);
        console.log(itemInformation.itemStateText)
        $("#itemState").val(itemInformation.itemStateText);
        App.enableButtonState(itemInformation);
    },

    enableButtonState: function(itemInformation){
        [
            $(".btn-harvest"),
            $(".btn-process"),
            $(".btn-pack"),
            $(".btn-forsale"),
            $(".btn-buy"),
            $(".btn-ship"),
            $(".btn-receive"),
            $(".btn-purchase")
        ].forEach((item)=> item.prop("disabled", true));
        console.log(Number(itemInformation.itemState))
        switch (itemInformation.itemState) {
            case HARVESTED_STATE: 
                if (itemInformation.originFarmerID == "0x0000000000000000000000000000000000000000") {
                    $(".btn-harvest").prop("disabled", false)
                } else {
                    $(".btn-process").prop("disabled", false); 
                }
            
                break;
            case PROCESSED_STATE: $(".btn-pack").prop("disabled", false); break;
            case PACKED_STATE: $(".btn-forsale").prop("disabled", false); break;
            case FOR_SALE_STATE: $(".btn-buy").prop("disabled", false); break;
            case SOLD_STATE: $(".btn-ship").prop("disabled", false); break;
            case SHIPPED_STATE: $(".btn-receive").prop("disabled", false); break;
            case RECEIVED_STATE: $(".btn-purchase").prop("disabled", false); break;
            case NEW_STATE: $(".btn-harvest").prop("disabled", false); break;
        }
    },

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        await App.initWeb3();
    },

    readForm: function () {
        web3 = new Web3(App.web3Provider);

        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
                window.ethereum.on('accountsChanged', function (accounts) {
                    console.log("account changed")
                    App.initDApp()
                });
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        await App.initDApp()
        
    },

    initDApp: async function(){
        await App.getMetaskAccountID();
        await App.initSupplyChain();
        await App.initFarmer()
        await App.initDistributor()
        await App.initRetailer()
        await App.initConsumer()
        console.log("DEFAULT ACCOUNT", web3.eth.accounts)
    },

    initFarmer: async function () {
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.isFarmer.call(App.metamaskAccountID);
        console.log("FFP", instance.events)
        
        if (!result) {
            $("#farmer-console").hide()
        } else {
            $("#farmer-console").show()
        }
    },
    initDistributor: async function () {
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.isDistributor.call(App.metamaskAccountID);
        if (!result) {
            $("#distributor-console").hide()
        } else {
            $("#distributor-console").show()
        }
    },
    initRetailer: async function () {
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.isRetailer.call(App.metamaskAccountID);
        if (!result) {
            $("#retailer-console").hide()
        } else {
            $("#retailer-console").show()
        }
    },
    initConsumer: async function () {
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.isConsumer.call(App.metamaskAccountID);
        if (!result) {
            $("#consumer-console").hide()
        } else {
            $("#consumer-console").show()
        }
    },
    addFarmer: async function(roleId){
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.addFarmer(roleId, {from: App.metamaskAccountID})
    },
    addDistributor: async function(roleId){
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.addDistributor(roleId, {from: App.metamaskAccountID})
    },
    addRetailer: async function(roleId){
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.addRetailer(roleId, {from: App.metamaskAccountID})
    },
    addConsumer: async function(roleId){
        const instance = await App.contracts.SupplyChain.deployed()
        const result = await instance.addConsumer(roleId, {from: App.metamaskAccountID})
    },
    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);
        let promise = new Promise((resolve, reject) => {
             // Retrieving accounts
            web3.eth.getAccounts(function(err, res) {
                if (err) {
                    console.log('Error:',err);
                    return;
                }
                console.log('getMetaskID:',res);
                App.metamaskAccountID = res[0];
                resolve()
            })
        })
        return promise;
    },
    
    initSupplyChain: function () {
        return new Promise((resolve, reject) => {
            /// Source the truffle compiled smart contracts
            var jsonSupplyChain='../../build/contracts/SupplyChain.json';
            /// JSONfy the smart contracts
            $.getJSON(jsonSupplyChain, function(data) {
                var SupplyChainArtifact = data;
                App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
                App.contracts.SupplyChain.setProvider(App.web3Provider);
                App.getItemInformation()
                App.fetchEvents();
            
                resolve();
            });
            App.bindEvents();
        })
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);
        App.readForm()
        switch(processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.getItemInformation()
                break;
            case 100:
                return await App.addFarmer($("#newFarmerID").val())
            case 200:
                return await App.addDistributor($("#newDistributorID").val())
            case 300:
                return await App.addRetailer($("#newRetailerID").val())
            case 400:
                return await App.addConsumer($("#newConsumerID").val())
        }
    },
    harvestItem: async function(event) {
        console.log("PING")
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const upc = $("#upc").val();
        const originFarmerName = $("#originFarmName").val();
        const originFarmInformation = $("#originFarmInformation").val();
        const originFarmLatitude = $("#originFarmLatitude").val();
        const originFarmLongitude = $("#originFarmLongitude").val();
        const productNotes = $("#productNotes").val();
        console.log(
            upc,
            originFarmerName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude,
            
        )
        const instance = await App.contracts.SupplyChain.deployed()
        try {
            await instance.harvestItem(
                upc, 
                originFarmerName, 
                originFarmInformation, 
                originFarmLatitude, 
                originFarmLongitude, 
                productNotes,
            {from: App.metamaskAccountID});  
            await App.getItemInformation(); 
        } catch(e) {
            console.error(e)
        }
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('processItem',result);
            App.getItemInformation(); 
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packItem',result);
            App.getItemInformation(); 
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {

            const productPrice = web3.toWei(App.productPrice, "ether");
            return instance.sellItem(App.upc, productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sellItem',result);
            App.getItemInformation(); 
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(App.productPrice, "ether");
            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
            App.getItemInformation(); 
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipItem',result);
            App.getItemInformation(); 
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
            App.getItemInformation(); 
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseItem',result);
            App.getItemInformation(); 
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: async function () {
        try {
            const instance = await App.contracts.SupplyChain.deployed()
            return await instance.fetchItemBufferOne.call(App.upc)
        } catch (err){
            console.error(err.message);
        }
    },

    fetchItemBufferTwo: async function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));             
        try {
            const instance = await App.contracts.SupplyChain.deployed()
            return await instance.fetchItemBufferTwo.call(App.upc)
        } catch (err){
            console.error(err.message);
        }
    },
    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
            var events = instance.allEvents({"fromBlock": 0}, function(err, log){
                if (!err)
                    $("#ftc-events").prepend('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            });
            
        }).catch(function(err) {
          console.log(err.message);
        });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
