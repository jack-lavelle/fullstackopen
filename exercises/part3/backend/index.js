require("dotenv").config({ path: __dirname + "/./../.env" });
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Contact = require("./contact");

morgan.token("data", function data(request) {
  return JSON.stringify(request.data);
});

const PORT = process.env.PORT || 3001;

function assignData(request, _, next) {
  request.data = request.body;
  next();
}

// error handler middleware
const errorHandler = (error, _, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(express.json());
app.use(express.static("dist"));
app.use(assignData);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data"),
);
app.use(cors());

app.get("/", (_, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (_, response, next) => {
  console.log("info");
  Contact.find({}).then((contacts) => {
    response.send(
      `<p>Phonebook has info for ${
        contacts.length
      } people.<p></p>${Date().toString()}</p>`,
    );
  });
});

app.get("/api/persons", (_, response) => {
  console.log("why though??");
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
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
        response.json(id);
      } else {
        response.json(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send({ error: "internal error" });
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
    response.json(savedContact);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;

  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).send({ error: "internal error" });
    });
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
