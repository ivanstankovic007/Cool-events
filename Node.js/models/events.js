// exports.create = function (pName, pDescription, pType, purchaseDate, price, userEmail) {
//     this.productName = pName;
//     this.productDescription = pDescription;
//     this.productType = pType;
//     this.purchaseDate = purchaseDate;
//     this.price = price;
//     this.userID = userEmail;
// }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var eventsSchema = new Schema({
  eventname: { type: String, required: true },
  eventdate: { type: Date, required: true },
  eventdescription: { type: String, required: true },
  eventlocation: { type: String, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  // userID: { type: String }
});

var Event = mongoose.model("Event", eventsSchema);

module.exports = Event;
