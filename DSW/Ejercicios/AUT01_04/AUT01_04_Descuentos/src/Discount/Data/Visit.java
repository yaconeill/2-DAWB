/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Discount.Data;

import java.util.Date;

/**
 *
 * @author Yaco
 */
public class Visit {

    Customer c = new Customer();
    Date date;
    String name = c.getName();
    Double serviceExpense;
    Double productExpense;

    public Visit(String name, Date date) {
        this.name = name;
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public Double getServiceExpense() {
        return serviceExpense;
    }

    public void setServiceExpense(Double ex) {
        this.serviceExpense = ex;
    }

    public Double getProductExpense() {
        return productExpense;
    }

    public void setProductExpense(Double ex) {
        this.productExpense = ex;
    }
}
