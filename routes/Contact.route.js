const {
  createContactForm,
  getAllContactForms,
} = require("../controller/Contact.controller");

const router = require("express").Router();

router.post("/createContact", createContactForm);
router.get("/get", getAllContactForms);

module.exports = router;
