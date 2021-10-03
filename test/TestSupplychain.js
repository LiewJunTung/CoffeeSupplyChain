// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
const ItemInformation = require('./test_helper')
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originFarmerID = accounts[1]
    const originFarmName = "John Doe"
    const originFarmInformation = "Yarray Valley"
    const originFarmLatitude = "-38.239770"
    const originFarmLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
    const productPrice = web3.utils.toWei("1", "ether")
    var itemState = 0
    const distributorID = accounts[2]
    const retailerID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    const HARVESTED_STATE = 0
    const PROCESSED_STATE = 1
    const PACKED_STATE = 2
    const FOR_SALE_STATE = 3
    const SOLD_STATE = 4
    const SHIPPED_STATE = 5
    const RECEIVED_STATE = 6
    const PURCHASED_STATE = 7

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44


    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Farmer: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Retailer: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        // add farmer1 to the role of farmer
        await supplyChain.addFarmer(accounts[1])
        
        // Declare and Initialize a variable for event
        
        // Watch the emitted event Harvested()
        // Mark an item as Harvested by calling function harvestItem()
        const call = await supplyChain.harvestItem(upc, originFarmName, originFarmInformation, originFarmLatitude, originFarmLongitude, productNotes, {from: originFarmerID})
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        const itemInfo = new ItemInformation(resultBufferOne, resultBufferTwo);
        console.log(itemInfo)
        // Verify the result set
        assert.equal(itemInfo.sku, sku, 'Error: Invalid item SKU')
        assert.equal(itemInfo.upc, upc, 'Error: Invalid item UPC')
        assert.equal(itemInfo.ownerID, originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(itemInfo.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(itemInfo.originFarmName, originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(itemInfo.originFarmInformation, originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(itemInfo.originFarmLatitude, originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(itemInfo.originFarmLongitude, originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(itemInfo.productID, productID, 'Error: Invalid productId')
        assert.equal(itemInfo.itemState, HARVESTED_STATE, 'Error: Invalid item State')
        assert.equal(call.logs[0].event, 'Harvested', 'Invalid event emitted')        
    })    

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        // Mark an item as Processed by calling function processtItem()
        const call = await supplyChain.processItem(upc, {'from': originFarmerID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        const itemInfo = new ItemInformation(resultBufferOne, resultBufferTwo);
        
        // Verify the result set
        assert.equal(itemInfo.sku, sku, 'Error: Invalid item SKU')
        assert.equal(itemInfo.upc, upc, 'Error: Invalid item UPC')
        assert.equal(itemInfo.ownerID, originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(itemInfo.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(itemInfo.originFarmName, originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(itemInfo.originFarmInformation, originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(itemInfo.originFarmLatitude, originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(itemInfo.originFarmLongitude, originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(itemInfo.productID, productID, 'Error: Invalid productId')
        assert.equal(itemInfo.productNotes, productNotes, 'Error: Invalid productNotes')
        assert.equal(itemInfo.itemState, PROCESSED_STATE, 'Error: Invalid item State')
        assert.equal(call.logs[0].event, 'Processed', 'Invalid event emitted') 
    })    

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark an item as Packed by calling function packItem()
        const call = await supplyChain.packItem(upc, {'from': originFarmerID})
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        const itemInfo = new ItemInformation(resultBufferOne, resultBufferTwo);
        
        // Verify the result set
        assert.equal(itemInfo.sku, sku, 'Error: Invalid item SKU')
        assert.equal(itemInfo.upc, upc, 'Error: Invalid item UPC')
        assert.equal(itemInfo.ownerID, originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(itemInfo.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(itemInfo.originFarmName, originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(itemInfo.originFarmInformation, originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(itemInfo.originFarmLatitude, originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(itemInfo.originFarmLongitude, originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(itemInfo.productID, productID, 'Error: Invalid productId')
        assert.equal(itemInfo.productNotes, productNotes, 'Error: Invalid productNotes')
        assert.equal(itemInfo.itemState, PACKED_STATE, 'Error: Invalid item State')
        assert.equal(call.logs[0].event, 'Packed', 'Invalid event emitted')  
    })    

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark an item as ForSale by calling function sellItem()
        const call = await supplyChain.sellItem(upc, productPrice, {'from': originFarmerID})
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        const itemInfo = new ItemInformation(resultBufferOne, resultBufferTwo);
        
        // Verify the result set
        assert.equal(itemInfo.sku, sku, 'Error: Invalid item SKU')
        assert.equal(itemInfo.upc, upc, 'Error: Invalid item UPC')
        assert.equal(itemInfo.ownerID, originFarmerID, 'Error: Missing or Invalid ownerID')
        assert.equal(itemInfo.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(itemInfo.originFarmName, originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(itemInfo.originFarmInformation, originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(itemInfo.originFarmLatitude, originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(itemInfo.originFarmLongitude, originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(itemInfo.productID, productID, 'Error: Invalid productId')
        assert.equal(itemInfo.productNotes, productNotes, 'Error: Invalid productNotes')
        assert.equal(itemInfo.productPrice, productPrice, 'Error: Invalid productPrice')
        assert.equal(itemInfo.itemState, FOR_SALE_STATE, 'Error: Invalid item State')
        assert.equal(call.logs[0].event, 'ForSale', 'Invalid event emitted')  
          
    })    

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        

        // Mark an item as Sold by calling function buyItem()
        
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)
        const itemInfo = new ItemInformation(resultBufferOne, resultBufferTwo);
        
        // Verify the result set
        assert.equal(itemInfo.sku, sku, 'Error: Invalid item SKU')
        assert.equal(itemInfo.upc, upc, 'Error: Invalid item UPC')
        assert.equal(itemInfo.ownerID, distributorID, 'Error: Missing or Invalid ownerID')
        assert.equal(itemInfo.originFarmerID, originFarmerID, 'Error: Missing or Invalid originFarmerID')
        assert.equal(itemInfo.originFarmName, originFarmName, 'Error: Missing or Invalid originFarmName')
        assert.equal(itemInfo.originFarmInformation, originFarmInformation, 'Error: Missing or Invalid originFarmInformation')
        assert.equal(itemInfo.originFarmLatitude, originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude')
        assert.equal(itemInfo.originFarmLongitude, originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude')
        assert.equal(itemInfo.productID, productID, 'Error: Invalid productId')
        assert.equal(itemInfo.productNotes, productNotes, 'Error: Invalid productNotes')
        assert.equal(itemInfo.productPrice, productPrice, 'Error: Invalid productPrice')
        assert.equal(itemInfo.itemState, FOR_SALE_STATE, 'Error: Invalid item State')
        assert.equal(call.logs[0].event, 'ForSale', 'Invalid event emitted')  
          
        
    })    

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Shipped()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
              
    })    

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Received()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
             
    })    

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Purchased()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
        
    })    

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        
        
        // Verify the result set:
        
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        
        
        // Verify the result set:
        
    })

});

