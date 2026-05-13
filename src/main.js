import "./css/style.css";
import PatientController from "./controllers/PatientController.js";

window.addEventListener("DOMContentLoaded", () => {
    const controller = new PatientController();

    controller.init()
})