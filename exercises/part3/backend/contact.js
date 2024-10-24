const url = process.env.MONGODB_URI;
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

console.log("Connecting to the MongoDB database at:", url);

mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to MongoDB.");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB: ", error.message);
    });

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

/**
 * @typedef {Object} Contact
 * @property {string} name
 * @property {string} number
*/

/**
 * @type {mongoose.Model{<Contact>}}
 */
const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact;
