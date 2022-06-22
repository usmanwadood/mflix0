import { response } from "express"
import MoviesDAO from "../dao/moviesDAO.js"

export default class MoviesController{

    static async apiGetMovies(req, res, next){

        const moviesPerPage = req.query.moviesPerPage?parseInt(req.query.moviesPerPage):20 // ternary operator
        const page = req.query.page?parseInt(req.query.page):0 // ternary operator

        let filters = {}
        if(req.query.rated){
            filters.rated = req.query.rated
        }

        else if(req.query.title){
            filters.title = req.query.title
        }

        const {moviesList, totalNumMovies} = await MoviesDAO.getMovies({filters, page, moviesPerPage})

        let response = {
            movies: moviesList,
            page: page,
            moviesPerPage: moviesPerPage,
            totalResults: totalNumMovies
        }

        res.json(response)
    }

    static async apiGetMovieById(req, res, next){

        try{

            let id = req.params.id || {}
            let movie = await MoviesDAO.getMovieById(id)

            if(!(movie)){
                res.status(404).json({error: "not found"})
            }
            res.json(movie)

        }
        catch(e){
            console.log(`apiId ${e}`)
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetRatings(req, res, next){

        try{

            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)

        }
        catch(e){

            console.log(`apiRatings ${e}`)
            res.status(500).json({error: e})
        }
    }
}