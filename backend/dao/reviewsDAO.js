// review data access object

import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO{

    static async injectDB(conn){

        if (!(reviews)){
           
            try{

                reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
            }
            catch{
                console.error(`unable to connect to ReviewsDAO: ${e}`)
            }
        }
    }

    static async addReview(movieId, userInfo, review, date){

        try{

            const newReview = {
                    user_id: userInfo._id, 
                    name: userInfo.name,
                    date: date,
                    review: review,
                    movie_id: ObjectId(movieId)

            }

            return await reviews.insertOne(newReview)
        }
        catch(e){

            console.error(`unable to add review ${e}`)
            return {error: e} 
        }
    }

    static async updateReview(reviewId, userId, review, date){

        try{

            const updateResponse = await reviews.updateOne({user_id: userId, _id: ObjectId(reviewId)}, {$set: {review: review, date: date}})
            return updateResponse
        }
        catch(e){

            console.error(`unable to update review ${e}`)
            return {error: e} 
        }
    }

    static async deleteReview(reviewId, userId){

        try{

            const deleteReview = await reviews.deleteOne({_id: ObjectId(reviewId), user_id: userId})
            return deleteReview
        }
        catch(e){

            console.error(`unable to delete review ${e}`)
            return {error: e}
        }
    }
}

