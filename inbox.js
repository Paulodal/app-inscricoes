var AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
  accessKeyId: "AKIA4CH6ERRKGS34LQB6",
  secretAccessKey: "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",
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
  contents.forEach((x, i) => {
    filename = x["Key"];
    // console.log(filename, i);
    s3.getObject({ Key: filename, Bucket: "email-repo-pp" }, (err, data) => {
      if (err) throw err;
      body = cleanup(data.Body.toString("utf-8"));
      var start = body.indexOf("Nome: ");
      var end = body.indexOf("<br>", start);
    //   var name = body.substring(start, end);
      console.log(cleanup(body.substring(start, end)));

      //   fs.writeFile("./tmp/" + i + '.txt', data.Body, (err) => {
      //     if (err) throw err;
      //     console.log("file downloaded successfully");
      //   });
    });
  });
});

function cleanup(str) {
    str = str.split('=C3=AD').join('í');
    str = str.split('=C3=A7').join('ç');
    str = str.split('=C3=A9').join('é');
    str = str.split('=C3=A1').join('á');
    str = str.split('=C3=A3').join('ã');
    str = str.split('=C3=83').join('Ã');
    str = str.split('=C3=87').join('Ç');
    str = str.split('=C3=AA').join('ê');
    str = str.split('=C3=BA').join('ú');
    str = str.split('=C3=B5').join('õ');
    str = str.split('=C3=B3').join('ó');
    str = str.split('=C3=B4').join('ô');
    return str;
}
