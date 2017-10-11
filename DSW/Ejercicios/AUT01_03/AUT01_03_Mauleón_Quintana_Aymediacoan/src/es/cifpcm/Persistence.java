/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm;

import java.util.List;

/**
 * @author Yaco
 */
public interface Persistence {
    static void open() {

    }


    static void save(Hotel hotel){

    }

    static void delete(Hotel hotel){

    }

    static List list(List Hotel){
        return Hotel;
    }
}
