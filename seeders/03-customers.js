const email = process.env.EMAIL_ADDRESS;
const getDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  //start.setDate(start.getDate() - 9 + key);
  endDate.setHours(endDate.getHours() + 4);
  return { startDate, endDate };
};
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      "customers",
      [
        {
          name: "pramod",
          email,
          company: "HPE",
          workshopList: ["RedFish API101", "HPE OneView API"],
          ...getDates(),
          // workshop: "RedFish API101",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "reddy",
          email,
          company: "HPE",
          workshopList: ["RedFish API101", "HPE OneView API"],
          ...getDates(),
          // workshop: "HPE OneView API",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "sareddy",
          email,
          company: "HPE",
          workshopList: [
            "Discover Grommet an HPE Open Source project to develop apps"
          ],
          ...getDates(),
          // workshop:
          //   "Discover Grommet an HPE Open Source project to develop apps",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {
        returning: true
      }
    ),

  down: queryInterface => queryInterface.bulkDelete("customers", null, {})
};
