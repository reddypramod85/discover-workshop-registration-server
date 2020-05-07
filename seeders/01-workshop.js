"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("workshops", [
      {
        name: "RedFish API101",
        description:
          "After a quick positioning of the DMTF Redfish API, we will explore a Redfish tree to understand its basic structure",
        capacity: 0,
        preRequisite: "Python, API",
        replayAvailable: true,
        active: false,
        videoUrl:
          "https://hpe.sharepoint.com/teams/HPE_TSS_2020/Presentations%20%20Recordings/Forms/AllItems.aspx?id=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud%2FHACK%5FSHACK%5FHS5%2DRedFish%20API101%2Emp4&parent=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nimble Storage REST API",
        description:
          "In this workshop we’ll go through some of the basics of the Nimble OS primitives to manipulate resources via the REST API",
        capacity: 20,
        preRequisite: "Python, API",
        replayAvailable: true,
        active: false,
        videoUrl:
          "https://hpe.sharepoint.com/teams/HPE_TSS_2020/Presentations%20%20Recordings/Forms/AllItems.aspx?id=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud%2FHACK%5FSHACK%5FHS9%2DIntroduction%20to%20the%20HPE%20Nimble%20Storage%20REST%20API%2Emp4&parent=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "HPE Simplivity REST API",
        description:
          "HPE SimpliVity is intelligently simple HCI that is suitable for geographically dispersed datacenter. You will learn how to use the fully supported HPE SimpliVity’ s REST API, to perform authentication, to manage your REST API sessions, to interpret and respond to the status of your REST call and many other fundamental knowledge of using HPE SimpliVity REST API",
        capacity: 20,
        preRequisite: "Python, API",
        replayAvailable: true,
        active: false,
        videoUrl:
          " https://hpe.sharepoint.com/teams/HPE_TSS_2020/Presentations%20%20Recordings/Forms/AllItems.aspx?id=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud%2FHACK%5FSHACK%5FHS4%2DLearn%20about%20fundamentals%20of%20HPE%20SimpliVity%20REST%20API%20and%20improve%20your%20agility%20in%20managing%20an%20HCI%20DC%2Emp4&parent=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "HPE OneView API",
        description:
          "In this workshop learn about HPE OneView, HPE's composable infrastructure management platform designed to help accelerate your customer outcomes. During our interactive session, we'll explore the API using Postman. After that, we will use PowerShell (or Python) to write a script that automates HPE OneView. By the end of the workshop, you will have written a simple example of infrastructure as code",
        capacity: 20,
        preRequisite: "Python, API",
        replayAvailable: true,
        active: false,
        videoUrl:
          " https://hpe.sharepoint.com/teams/HPE_TSS_2020/Presentations%20%20Recordings/Forms/AllItems.aspx?id=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud%2FHACK%5FSHACK%5FHS6%2DDive%20into%20infrastructure%20automation%20with%20the%20HPE%20OneView%20API%2Emp4&parent=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: "Discover Grommet an HPE Open Source project to develop apps",
        description:
          "Grommet is a react-based framework that provides accessibility, modularity, responsiveness, and theming in a tidy package. This session will allow you to discover the basics and deploy your first app on Netifly",
        capacity: 20,
        preRequisite: "ReactJS, JavaScript",
        replayAvailable: true,
        active: false,
        videoUrl:
          "https://hpe.sharepoint.com/teams/HPE_TSS_2020/Presentations%20%20Recordings/Forms/AllItems.aspx?id=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud%2FHACK%5FSHACK%5FHS7%2DGrommet%2Emp4&parent=%2Fteams%2FHPE%5FTSS%5F2020%2FPresentations%20%20Recordings%2FSoftware%20Defined%20%26%20Cloud",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Workshops", null, {});
  }
};
