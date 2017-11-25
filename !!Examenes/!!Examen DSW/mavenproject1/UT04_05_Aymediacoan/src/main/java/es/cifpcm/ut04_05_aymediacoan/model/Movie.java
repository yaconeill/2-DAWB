/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.ut04_05_aymediacoan.model;

/**
 *
 * @author Yaco
 */
public class Movie {
    private Integer idMovie;
    private Integer idCategory;
    private String title;

    public Movie(Integer idCategory, String title) {
        this.idCategory = idCategory;
        this.title = title;
    }

    public Movie() {
    }
    

    public Integer getIdMovie() {
        return idMovie;
    }

    public void setIdMovie(Integer idMovie) {
        this.idMovie = idMovie;
    }

    public Integer getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer idCategory) {
        this.idCategory = idCategory;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    
}
