
module.exports = class ItemInformation {
    constructor(resultBufferOne, resultBufferTwo){
        this.sku = resultBufferOne[0]
        this.upc = resultBufferOne[1]
        this.ownerID = resultBufferOne[2]
        this.originFarmerID = resultBufferOne[3]
        this.originFarmName = resultBufferOne[4]
        this.originFarmInformation = resultBufferOne[5]
        this.originFarmLatitude = resultBufferOne[6]
        this.originFarmLongitude = resultBufferOne[7]
        this.productID = resultBufferTwo[3]
        this.productNotes = resultBufferTwo[4]
        this.productPrice = resultBufferTwo[5]
        this.itemState = resultBufferTwo[6]
        this.distributorID = resultBufferTwo[7]
        this.retailerID = resultBufferTwo[8]
        this.consumerID = resultBufferTwo[9]
    }
}