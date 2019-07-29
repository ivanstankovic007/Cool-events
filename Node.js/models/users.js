// exports.create = function (fn, ln, email, birthdate, tel, country, pass) {
//     this.firstname = fn;
//     this.lastname = ln;
//     this.email = email;
//     this.birthdate = birthdate;
//     this.telephone = tel;
//     this.country = country;
//     this.pass = pass;
// }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var usersSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

usersSchema.pre('save', async function (next) {
  try {
      const salt = await bcrypt.genSalt(10)

      const passwordHash = await bcrypt.hash(this.password, salt)

      this.password = passwordHash;
      next();
  } catch (error) {
      next(error)
  }
})

var User = mongoose.model("User", usersSchema);

module.exports = User;
