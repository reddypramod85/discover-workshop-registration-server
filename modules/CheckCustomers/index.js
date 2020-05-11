import cron from "cron";
import models from "../../models";
import createEmailBody from "../Email/createEmailBody";
import sendEmail from "../Email";
import dotenv from "dotenv";

dotenv.config();

const { CronJob } = cron;

const getHoursLeft = ends => {
  const oneHour = 1 * 60 * 60 * 1000;
  const endsDate = new Date(ends);
  const today = new Date();
  return Math.round((endsDate.getTime() - today.getTime()) / oneHour);
};

const getDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(
    parseFloat(endDate.getHours()) + parseFloat(process.env.WORKSHOP_DURATION)
  );
  return { startDate, endDate };
};

/* Function to generate combination of password */

const generatePassword = () => {
  var pass = "";
  var str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    var char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
};

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const checkCustomer = () => {
  models.customer
    .findAll({ include: [{ all: true, nested: true }] })
    .then(customers =>
      customers.map(async customer => {
        // eslint-disable-line array-callback-return
        const { dataValues } = customer;
        const customerStatus = dataValues.active;
        //const updated = dataValues.upupdatedAt.getHours();
        const hoursLeft = getHoursLeft(dataValues.endDate);

        // Send welcome email.
        if (!dataValues.lastEmailSent && dataValues.studentId != null) {
          console.log("send welcome email");
          return sendEmail({
            recipient: dataValues.email,
            subject: "Welcome to HPE Workshops",
            content: createEmailBody({
              heading: "Welcome to HPE Workshops!",
              content: `
                Hi ${dataValues.name},</br>
                Your request for the <b>${dataValues.workshopList}</b> workshop(s) has been received. We will send you the access details 1 hour before the session starts in a seperate email.</br>
                </br></br>
              `,
              buttonLabel: "Modify Registration",
              buttonUrl: "http://localhost:3000/modify"
            })
          }).then(() => {
            customer.update({
              lastEmailSent: "welcome"
            });
          });
        }

        // Send workshop credentilas as soon as there are ready.
        if (customerStatus && dataValues.lastEmailSent === "welcome") {
          // fetch the customer requested workshops from workshops table

          const workshops = await models.workshop.findAll({
            attributes: ["name", "replayAvailable", "videoUrl"],
            where: { name: dataValues.workshopList }
          });
          let arr = [];
          workshops.forEach(workshop => {
            arr.push({ ...workshop.dataValues });
          });
          console.log("workshops arr", arr);
          console.log("send workshops credentials email");
          return sendEmail({
            recipient: dataValues.email,
            subject: "Your HPE Workshops credentials",
            content: createEmailBody({
              heading: "Your HPE Workshops credentials",
              content: `You can start your <b>${dataValues.workshopList}</b> workshop(s) using credentials provided below. Your access to the workshop will end in ${process.env.WORKSHOP_DURATION} hours from now.`,
              buttonLabel: "Start Workshop",
              buttonUrl: dataValues.student.url,
              userName: dataValues.student.username,
              password: dataValues.student.password,
              // videoUrl: `${workshop.replayAvailable}` ? workshop.videoUrl : ""
              videoUrl: arr
            })
          }).then(() => {
            customer.update({
              lastEmailSent: "credentials",
              ...getDates()
            });
          });
        }

        // Send expired email.
        if (hoursLeft <= 0 && dataValues.lastEmailSent === "credentials") {
          console.log("send expired email");
          return sendEmail({
            recipient: dataValues.email,
            subject: "Your HPE Workshops On Demand session has ended",
            content: createEmailBody({
              heading: "Thanks for trying HPE Workshops On Demand!",
              content: `We hope you enjoyed <b>${dataValues.workshop}<b> Workshop.`,
              buttonLabel: "Click here to Provide the Feedback",
              buttonUrl:
                "https://forms.office.com/Pages/ResponsePage.aspx?id=YSBbEGm2MUuSrCTTBNGV3KiKnXK8thhKg7iBfJh46UlUQzFEUUVGMVVQMEowMElUMVY3WkVUU0pWVi4u"
            })
          }).then(async () => {
            customer.update({
              lastEmailSent: "expired",
              active: false
            });
            customer.student.update({
              assigned: false,
              password: generatePassword()
            });
            // fetch the customer requested workshop from workshops table
            const workshop = await models.workshop.findOne({
              where: { name: dataValues.workshop }
            });
            await workshop.increment("capacity");
          });
        }
        return;
      })
    );
};

const runCronJobs = () => {
  const jobToCheckCustomers = new CronJob({
    // cronTime: '00 00 * * * *', // every hour
    cronTime: "*/20 * * * * *", // every 20 seconds
    // onTick: checkCustomer(),
    onTick: () => checkCustomer(),
    runOnInit: true
  });

  jobToCheckCustomers.start();
};

export default runCronJobs;
