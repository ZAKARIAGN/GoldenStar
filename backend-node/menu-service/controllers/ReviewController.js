import {addReview} from '../services/ReviewServices.js';

export const addReviewController = async (req, res) => {
    try {

        const user_id = req.headers["x-user-id"];
        const item_id = req.params.id;
        const result = await addReview(req.body,user_id,item_id);
        res.status(201).json({success:true,result});
    } catch (error) {
        if(error.errors){
            return res.status(error.statusCode || 400).json({
                message: error.message,
                errors: error.errors
            });
        }

        return res.status(error.statusCode || 500).json({
            message: error.message
        });
    }
}
    