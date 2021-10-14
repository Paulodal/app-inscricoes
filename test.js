require("./database");
const Volunteer = require("./models/Volunteer");

(async () => {
  const name = 'Ricardo';
  const email = 'rmmisawa@gmail.com';

  for (i = 1; i <= 20; i++) {
    const v = await Volunteer.findOne({
      order: [["cvv_number", "DESC"]],
    });
    console.log(v.cvv_number);
    console.log(i);
    await Volunteer.create({
      cvv_number: v.cvv_number + 1,
      name: name,
      email: email,
    });
  }
})();
