require("dotenv").config({ path: __dirname + '/./../.env' });
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Contact = require("./contact")

morgan.token("data", function data(request) {
    return JSON.stringify(request.data);
});

app.use(express.json());
app.use(express.static("dist"));
app.use(assignData);
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :data"
    )
);
app.use(cors());

function assignData(request, _, next) {
    request.data = request.body;
    next();
}

app.get("/", (_, response) => {
    response.send("<h1>Hello World!</h1>");
})

app.get("/api/persons", (_, response) => {
    Contact.find({}).then((contacts) => {
        response.json(contacts);
    });
});

app.get("/info", (_, response) => {
    Contact.find({}).then(contacts => {
        response.send(
            `<p>Phonebook has info for ${contacts.length
            } people.<p></p>${Date().toString()}</p>`
        );
    })
});

app.get("/api/persons/:id", (request, response) => {
    Contact.findById(request.params.id)
        .then((note) => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => {
            console.log(error);
            response.status(400).send({ error: "malformed id" });
        });
});

app.delete("/api/persons/:id", (request, response) => {
    Contact.findByIdAndDelete(request.params.id)
        .then((id) => {
            if (id) {
                response.json(id)
            } else {
                response.json(404).end();
            }
        })
        .catch(error => {
            console.log(error)
            response.status(500).send({ error: "internal error" })
        });
});

app.post("/api/persons", (request, response) => {
    const body = request.body;
    if (!body.name) {
        return response.status(400).json({
            error: "name missing",
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing",
        });
    }

    const contact = new Contact({
        name: body.name,
        number: body.number,
    });

    contact.save().then((savedContact) => {
        response.json(savedContact)
    })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
