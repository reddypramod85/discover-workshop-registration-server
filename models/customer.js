/* eslint-disable */
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      company: DataTypes.STRING,
      workshopList: DataTypes.ARRAY(DataTypes.STRING),
      // workshop: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      lastEmailSent: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  Customer.associate = models => {
    Customer.belongsTo(models.student, {
      foreignKey: {
        field: "studentId"
        //allowNull: false,
        // defaultValue: 0
      }
    });
  };
  // Customer.associate = models => {
  //   Customer.belongsTo(models.workshop, {
  //     foreignKey: {
  //       field: "workshopId"
  //       //allowNull: false,
  //       // defaultValue: 0
  //     }
  //   });
  // };
  return Customer;
};
/* eslint-enable */
