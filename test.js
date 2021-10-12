require("./database");
const Volunteer = require("./models/Volunteer");

async function readdb() {
  const v = await Volunteer.findOne({
    order: [["cvv_number", "DESC"]],
  })
  console.log(v.cvv_number);
  return v;
}

for(i = 1; i <= 20; i++) {
  const v = readdb();
  console.log(i);
}
