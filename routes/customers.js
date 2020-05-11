import express from "express";
import models from "../models";
const Sequelize = require("sequelize");
const op = Sequelize.Op;
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// end customer workshop trail in process.env.WORKSHOP_DURATION hours
const getDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(
    parseFloat(endDate.getHours()) + parseFloat(process.env.WORKSHOP_DURATION)
  );
  return { startDate, endDate };
};

// Get customers
router.get("/customers", (req, res) => {
  models.customer
    .findAll({
      raw: true
    })
    .then(entries => res.send(entries));
});

// Get customer by ID
router.get("/customer/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send("Customer Not Found");
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Get customer by emailID
router.get("/customer/email/:emailID", (req, res) => {
  models.customer
    .findAll({
      where: { email: req.params.emailID }
    })
    .then(entry => {
      if (entry) res.status(200).send(entry);
      else res.status(400).send("Customer Not Found");
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Create customer
router.post("/customer/create", async (req, res) => {
  try {
    // check whether customer is already registered for another workshop
    const { count, rows } = await models.customer.findAndCountAll({
      where: {
        email: req.body.email
      }
    });
    console.log("count", count);
    if (count >= 1) {
      res
        .status(202)
        .send({
          message:
            "You have already registered, please click on update to make changes!",
          response: rows
        });
      return;
    }
    // fetch the customer requested workshop from workshops table
    // const workshops = await models.workshop.findAll({
    //   where: { name: req.body.workshopList }
    // });

    // fetch the unassigned student account to assign to the requested customer
    const student = await models.student.findOne({
      where: {
        assigned: {
          [op.eq]: false
        }
      }
    });
    // return error if student account is not available else assign it to the customer
    if (student === null) {
      console.log("Student Account Not Available!");
      res.status(202).send("Registration full, try agian tomorrow");
      return;
    } else {
      console.log("customer req", req.body);
      const dataValues = await models.customer.create({
        ...req.body,
        ...getDates(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      if (dataValues) {
        await student.update({
          assigned: true
        });
        await dataValues.update({
          studentId: student.id
          // workshopId: workshop.id
        });
        await models.workshop.decrement("capacity", {
          where: { name: dataValues.workshopList }
        });
        //await dataValues.save();
        res.status(200).send({});
      }
    }
    // }
  } catch (error) {
    console.log("error in catch!", error);
    res.status(400).send({ error });
  }
});

// Edit customer
router.put("/customer/edit/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      console.log("req.body", req.body);
      entry
        .update({ ...req.body })
        .then(({ dataValues }) => res.status(200).send(dataValues));
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Delete customer
router.delete("/customer/delete/:id", (req, res) => {
  models.customer
    .findOne({
      where: { id: req.params.id }
    })
    .then(entry => {
      entry.destroy().then(() => res.status(200).send({}));
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

export default router;
