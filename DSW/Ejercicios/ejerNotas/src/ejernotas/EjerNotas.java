/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejernotas;

/**
 *
 * @author Yaco
 */
public class EjerNotas {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        System.out.println("Tipo \tRango");
        System.out.println("-------------------------");
        int intMax = Integer.MAX_VALUE;
        int intMin = Integer.MIN_VALUE;
        System.out.println("int \t[" + intMin + "," + intMax + "]");

        long longMax = Long.MAX_VALUE;
        long longMin = Long.MIN_VALUE;
        System.out.println("Long \t[" + longMin + "," + longMax + "]");

        float flMax = Float.MAX_VALUE;
        float flMin = Float.MIN_VALUE;
        System.out.println("Float \t[" + flMin + "," + flMax + "]");

        double doubMax = Double.MAX_VALUE;
        double doubMin = Double.MIN_VALUE;
        System.out.println("Double \t[" + doubMin + "," + doubMax + "]");

        System.out.println("\nTipo \tBits");
        System.out.println("-------------------------");
        double intBit = (Math.log10(intMax) / Math.log10(2));
        double longBit = (Math.log10(longMax) / Math.log10(2));
        System.out.println("Int \t" + ((Math.round(intBit)) + 1));
        System.out.println("Long \t" + ((Math.round(longBit)) + 1));

    }

}
