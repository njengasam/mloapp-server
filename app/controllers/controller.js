// import { db } from '../database/connection';
import 'dotenv/config';
import { status } from '../helpers/status.js';
import { v4 as uuidv4 } from 'uuid';
import { ClarifaiStub } from 'clarifai-nodejs-grpc';
const grpc = require("@grpc/grpc-js");


class Predict {
    static getPrediction(req, res){
        const {imageUrl} = req.body;
            const apiKey = process.env.API_KEY;

            const stub = ClarifaiStub.grpc();

            const metadata = new grpc.Metadata();
            metadata.set("authorization", `Key ${apiKey}`);

            stub.PostModelOutputs(
                {
                    model_id: "bd367be194cf45149e75f01d59f77ba7",
                    inputs: [{data: {image: {url: imageUrl}}}]
                },
                metadata,
                (err, response) => {
                    if (err) {
                        console.log("Error: " + err);
                        return res.status(status.bad).json({error:"unable to process your request"});
                    }

                    if (response.status.code !== 10000) {
                        console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
                        return res.status(status.bad).json({error:"unable to process your request"});
                    }
                    
                    const toPercentage = (value) => {
                        return Math.round((value * 100));
                    }

                    const data = [];
                    for (const c of response.outputs[0].data.concepts) {
                        data.push({id:uuidv4(), name:c.name, value:toPercentage(c.value)});  
                    }
                    return res.status(status.success).json(data);
                }
            );
    }
}


export{
    Predict
}

