/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication4;

import java.util.ArrayList;
/**
 * @author Aymediacoán Mauleón Quintana
 */
public class JavaApplication4 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        ArrayList<Integer> Ist = new ArrayList<Integer>();
        Ist.add(1);        
        Ist.add(2);
        Ist.add(3);

        int r = 0;
        for (int i : Ist){
            r = r + i;
        }
        System.out.println("Hola el doble del resultado es: "+r);
    }
    
}
