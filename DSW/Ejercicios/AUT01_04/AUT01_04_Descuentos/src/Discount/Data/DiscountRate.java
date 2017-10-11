/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Discount.Data;

/**
 *
 * @author Yaco
 */
public class DiscountRate {

    static Double serviceDiscountPremium = 0.2;
    static Double serviceDiscountGold = 0.15;
    static Double serviceDiscountSilver = 0.1;
    static Double productDiscountPremium = 0.1;
    static Double productDiscountGold = 0.1;
    static Double productDiscountSilver = 0.1;

    private Double getServiceDiscountRate(String type) {
        double s;
        switch (type) {
            case "premium":
                s = serviceDiscountPremium;
                break;
            case "gold":
                s = serviceDiscountGold;
                break;
            case "silver":
                s = serviceDiscountSilver;
                break;
            default:
                s = 0;
        }
        return s;
    }

    private Double getProductDiscountRate(String type) {
        double s;
        switch (type) {
            case "premium":
                s = productDiscountPremium;
                break;
            case "gold":
                s = serviceDiscountGold;
                break;
            case "silver":
                s = serviceDiscountSilver;
                break;
            default:
                s = 0;
        }
        return s;
    }
}
