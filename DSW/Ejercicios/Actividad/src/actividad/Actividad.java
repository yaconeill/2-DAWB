/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package actividad;

import java.util.Scanner;
/**
 *
 * @author Aymediacoán Mauleón Quintana
 */
public class Actividad {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("introducir un valor entero: ");        
        int a = sc.nextInt();
        System.out.print("introducir otro valor entero: ");
        int b = sc.nextInt();
        System.out.println("\nSuma: " + (a+b) +
                           "\nResta: " + (a-b) +
                           "\nDivision: " + (a/b) +
                           "\nModulo: " + (a%b));
    }    
}
