/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Discount;

import Discount.Data.Customer;
import Discount.Data.FIlePersistance;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author Yaco
 */
public class Bill {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        FIlePersistance f = new FIlePersistance();
        System.out.println("====== Bienvenido a ABW - All the Books in the World =====\n");
        System.out.print("Introducir un usuario para generar factura: ");
        String user = new Scanner(System.in).nextLine();
        ArrayList userData = FIlePersistance.open(user);
        
    }
    
}
