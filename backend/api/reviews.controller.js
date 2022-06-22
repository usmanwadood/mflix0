import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {

    static async apiPostReviews(req, res, next){

        try{
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(movieId, userInfo, review, date)

            res.json({status: "success"})

        } catch(e){

            res.status(500).json({error: `Error Occured: ${e.message}`})
        }

    }

    static async apiPutReviews(req, res, next){

        try{
            const userId = req.body.user_id
            const review = req.body.review
            const reviewId = req.body.review_id
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.updateReview(reviewId, userId, review, date)

            var {error} = ReviewResponse

            if(error){

                res.status(400).json({error})
            }

            if(ReviewResponse.modifiedCount == 0){
                throw new Error("unable to update review. User may not be original poster")
            }

            res.json({status: "success"})

        } catch(e){

            res.status(500).json({error: `Error Occured: ${e.message}`})
        }
        
    }

    static async apiDeleteReviews(req, res, next){
        try{
            const userId = req.body.user_id
            const reviewId = req.body.review_id
            
            const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, userId)

            res.json({status: "success"})

        } catch(e){

            res.status(500).json({error: `Error Occured: ${e.message}`})
        }
    }
}