/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.micafeteria_aymediacoan.web;

/**
 *
 * @author Yaco
 */
public class Order {

    private Integer orderId;
    private String tipoCafe;
    private String extras;
    private Integer numeroExtras;
    private double total;

    public Order() {
    }

    public Order(Integer orderId, String tipoCafe, String extras, Integer numeroExtras, double total) {
        this.orderId = orderId;
        this.tipoCafe = tipoCafe;
        this.extras = extras;
        this.numeroExtras = numeroExtras;
        this.total = total;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getTipoCafe() {
        return tipoCafe;
    }

    public void setTipoCafe(String tipoCafe) {
        this.tipoCafe = tipoCafe;
    }

    public String getExtras() {
        return extras;
    }

    public void setExtras(String extras) {
        this.extras = extras;
    }

    public Integer getNumeroExtras() {
        return numeroExtras;
    }

    public void setNumeroExtras(Integer numeroExtras) {
        this.numeroExtras = numeroExtras;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

}
