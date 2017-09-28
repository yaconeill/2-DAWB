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

    static void close() {

    }

//    static void save(hotel:Hotel){
//
//    }
//
//    static void delete(hotel:Hotel){
//
//    }

    static List list(List Hotel){
        return Hotel;
    }
}
