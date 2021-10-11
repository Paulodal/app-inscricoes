var AWS = require("aws-sdk");
const fs = require("fs");
require("./database");
const awsConfig = require("./config/aws");
const Volunteer = require("./models/Volunteer");

AWS.config.update({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: "us-east-1",
});

var s3 = new AWS.S3();

var params = {
  Bucket: "email-repo-pp",
  Delimiter: "/",
  Prefix: "",
};

s3.listObjects(params, (err, data) => {
  if (err) throw err;
  var contents = data["Contents"];
  var filename = "";
  var body = "";
  var start = 0;
  var end = 0;
  var name = "";
  var email = "";
  var telefone = "";
  var cidade = "";

  contents.forEach((x, i) => {
    filename = x["Key"];

    s3.getObject(
      {
        Key: filename,
        Bucket: "email-repo-pp",
      },
      async (err, data) => {
        if (err) throw err;

        body = data.Body.toString("utf-8");

        start = body.indexOf("Nome: ") + 6;
        end = body.indexOf("<br>", start);
        name = cleanup(body.substring(start, end));

        start = body.indexOf("E-mail: ") + 8;
        end = body.indexOf("<br>", start);
        email = cleanup(body.substring(start, end));

        start = body.indexOf("Telefone: ") + 10;
        end = body.indexOf("<br>", start);
        telefone = cleanup(body.substring(start, end));

        start = body.indexOf("Cidade: ") + 8;
        end = body.indexOf("<br>", start);
        cidade = cleanup(body.substring(start, end));

        // console.log(name, email, telefone, cidade);

        const v = await Volunteer.findOne({
          order: [["cvv_number", "DESC"]],
        });

        console.log(v.cvv_number, name, email, telefone, cidade);

        const volunteer = await Volunteer.create({
          cvv_number: v.cvv_number + 1,
          name: name,
          email: email,
        });
      }
    );
  });
});

function cleanup(str) {
  str = str.split("=C3=AD").join("í");
  str = str.split("=C3=8D").join("Í");
  str = str.split("=C3=A7").join("ç");
  str = str.split("=C3=87").join("Ç");
  str = str.split("=C3=A9").join("é");
  str = str.split("=C3=89").join("É");
  str = str.split("=C3=A1").join("á");
  str = str.split("=C3=81").join("Á");
  str = str.split("=C3=A3").join("ã");
  str = str.split("=C3=83").join("Ã");
  str = str.split("=C3=A2").join("â");
  str = str.split("=C3=82").join("Â");
  str = str.split("=C3=AA").join("ê");
  str = str.split("=C3=BA").join("ú");
  str = str.split("=C3=B5").join("õ");
  str = str.split("=C3=B3").join("ó");
  str = str.split("=C3=B4").join("ô");
  return str;
}
