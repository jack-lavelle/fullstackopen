const mongoose = require("mongoose");
let shouldShowContacts = false;

if (process.argv.length < 3) {
    console.log("You must at least provide a password as an argument.");
} else if (process.argv.length < 4) {
    console.log("Showing all contacts:");
    shouldShowContacts = true;
} else if (process.argv.length < 5) {
    console.log("Adding a contact requires a password, name and number.");
}

const password = process.argv[2];

const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://jacklavelle17:${password}@cluster0.esb09wo.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

if (shouldShowContacts) {
    Contact.find({}).then((result) => {
        result.forEach((contact) => {
            console.log(`   ${contact.name} ${contact.number}`);
        });
        mongoose.connection.close();
    });
} else {
    const contact = new Contact({
        name: name,
        number: number,
    });

    contact.save().then((result) => {
        console.log(
            `Added the following contact to the phonebook - name: ${name}, number: ${number}`
        );
        mongoose.connection.close();
    });
}
