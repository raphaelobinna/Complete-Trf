const express = require("express"); //Import the express dependency
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 3000; //Save the port number where your server will be listening
const bodyParser = require("body-parser");
const { spawn, exec } = require("child_process");
const fs = require("fs");
const readline = require("readline");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const path = require("path");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  const key = process.env.OPENAI_API_KEY;
  //get requests to the root ("/") will route here
  res.json({
    message: `Works fine - ${key.substring(0, 5)}`,
  }); //server responds by sending the JSON to the client's browser
});

app.post("/psql-import", (req, res) => {
  const { user, password, hostname, port, database, id } = req.body;
  if (!user || !password || !hostname || !port || !database || !id) {
    res.json({
      message: "An error occurred due to invalid details",
    });

    return;
  }
  const info = `pg_dump --host=${hostname} --port=${port} --username=${user} --dbname=${database} > ${id}-backup.sql `;

  const ls = spawn(`PGPASSWORD="${password}" ${info}`, [], { shell: true });

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on("error", (error) => {
    console.log(`error: ${error.message}`);
    spawn(`rm ${id}-backup.sql`, [], { shell: true });
    res.json({
      message: "An error ocurred on listen to error",
      error: error.message,
    });
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
      res.json({
        message: "Process is complete with",
      });

      return;
    }
    spawn(`rm ${id}-backup.sql`, [], { shell: true });
    res.json({
      message: `An error ocurred, exited with code - ${code}`,
    });
  });
});

app.post("/psql-export", (req, res) => {
  const { user, password, hostname, port, database, id } = req.body;
  if (!user || !password || !hostname || !port || !database || !id) {
    res.json({
      message: "An error occurred due to invalid details",
    });

    return;
  }
  const info = `psql -d ${database} -h ${hostname} -p ${port} -U ${user}  < ${id}-backup.sql `;

  const ls = spawn(`PGPASSWORD="${password}" ${info}`, [], { shell: true });

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on("error", (error) => {
    console.log(`error: ${error.message}`);

    res.json({
      message: "An error ocurred",
      error: error.message,
    });
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
      res.json({
        message: "Process is complete",
      });

      return;
    }
    res.json({
      message: "An error ocurred",
    });
  });
});

//For Mysql and MariaDB

//You will need your database’s name and credentials for an account whose privileges allow at least full read-only access to the database.
app.post("/mysql-import", (req, res) => {
  const { user, password, hostname, port, database, id } = req.body;
  if (!user || !password || !hostname || !port || !database || !id) {
    res.json({
      message: "An error occurred due to invalid details",
    });

    return;
  }

  const info = `mysqldump -h ${hostname} -u ${user} -p${password} --port ${port} ${database} --column-statistics=0 --no-tablespaces > ${id}-backup.sql `;

  const ls = spawn(`${info}`, [], { shell: true });

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on("error", (error) => {
    console.log(`error: ${error.message}`);
    spawn(`rm ${id}-backup.sql`, [], { shell: true });
    res.json({
      message: "An error ocurred",
      error: error.message,
    });
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);

    res.json({
      message: `Process is complete`,
    });

    return;
  });
});

app.post("/mysql-export", (req, res) => {
  const { user, password, hostname, port, database, id } = req.body;
  if (!user || !password || !hostname || !port || !database || !id) {
    res.json({
      message: "An error occurred due to invalid details",
    });

    return;
  }
  const info = `mysql -u ${user} -h ${hostname} -p${password} --port ${port} ${database} < ${id}-backup.sql `;

  const ls = spawn(`${info}`, [], { shell: true });

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", (data) => {
    console.log(`stderr-: ${data}`);
  });

  ls.on("error", (error) => {
    console.log(`error: ${error.message}`);
    res.json({
      message: "An error ocurred",
      error: error.message,
    });
  });

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);

    res.json({
      message: "Process is complete with",
    });

    return;
  });
});

app.get("/process/psql/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.json({
      message: "Invalid details",
    });

    return;
  }
  const result = [];

  const parseCopyStatement = async (contentStatement, tableName) => {
    // Split the copy statement into individual rows
    contentStatement.unshift(`CREATE TABLE ${tableName}`);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `convert the following sql to solidity ${contentStatement}`,
        temperature: 0.7,
        max_tokens: 3708,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      result.push(response.data);
    } catch (error) {
      res.end({ error });
    }
  };

  try {
    let sqlFile = path.join(__dirname, `${id}-backup.sql`);
    let jsonData = {};

    //read sql file
    fs.readFile(sqlFile, "utf8", async function (err, data) {
      if (err) throw err;

      //split into lines
      let lines = data.split(/\r?\n/);

      //loop through each line

      //meant to be lines.length
      for (let i = 0; i < 210; i++) {
        //check if line starts with CREATE
        if (lines[i].startsWith("CREATE TABLE")) {
          //split line at space
          let parts = lines[i].split(" ");
          //get table name
          let content = [];

          let n = 1;

          while (lines[i + n] !== ");") {
            content.push(lines[i + n]);
            n++;
          }

          let tableName = parts[2];

          //make json object for table

          await parseCopyStatement(content, tableName);
        }
      }
      res.send({ result });
    });
  } catch (error) {
    res.json({ message: "An error occurred", error: error?.message });
  }
});

app.get("/process/mysql/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (!id) {
    res.json({
      message: "Invalid details",
    });

    return;
  }
  const result = [];

  const parseCopyStatement = async (contentStatement, tableName) => {
    // Split the copy statement into individual rows
    contentStatement.unshift(`CREATE TABLE ${tableName}`);

    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `convert the following sql to solidity ${contentStatement}`,
        temperature: 0.7,
        max_tokens: 3708,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      result.push(response.data);
    } catch (error) {
      console.log("errrrrrr", error?.response);
      res.end({ error });
    }
  };

  try {
    let sqlFile = path.join(__dirname, `${id}-backup.sql`);
    let jsonData = {};

    //read sql file
    fs.readFile(sqlFile, "utf8", async function (err, data) {
      if (err) throw err;

      //split into lines
      let lines = data.split(/\r?\n/);

      //loop through each line

      //meant to be lines.length
      for (let i = 0; i < 48; i++) {
        //check if line starts with CREATE
        if (lines[i].startsWith("CREATE TABLE")) {
          //split line at space
          let parts = lines[i].split(" ");

          let content = [];

          let n = 1;

          while (!lines[i + n].endsWith("COLLATE=utf8mb4_unicode_ci;")) {
            content.push(lines[i + n]);
            n++;
          }

          let tableName = parts[2];

          //make json object for table

          await parseCopyStatement(content, tableName);
        }
      }
      res.send({ result });
    });
  } catch (error) {
    res.json({ message: "An error occurred", error: error?.message });
  }
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});

//  normal database to database - divided into mysql and psql
// normal database to blockchain code

// -mysql transfer : mysql to another mysql
// -psql transfer : psql to another psql
//- mysql to blockchain generator
//- psql to blockchain generator
