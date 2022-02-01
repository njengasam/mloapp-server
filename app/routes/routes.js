import { Predict } from "../controllers/controller.js";

export default (app)=>{
// prediction endpoints
    app.post("/predictions", Predict.getPrediction);
    // app.post("/predictions/save", Predict.savePrediction);
}