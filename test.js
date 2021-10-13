require("./database");
const Volunteer = require("./models/Volunteer");

(async () => {
  for (i = 1; i <= 20; i++) {
    const v = await Volunteer.findOne({
      order: [["cvv_number", "DESC"]],
    });
    console.log(v.cvv_number);
    console.log(i);
  }
})();
