/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package clientesconsumos;

import java.sql.Date;

/**
 *
 * @author Yaco
 */
public class Measures {
    private Integer idMeasure;
    private Integer clNo;
    private Date dateTime;    
    private double kw;

    public Measures(Integer idMeasure, Integer clNo, Date dateTime, double kw) {
        this.idMeasure = idMeasure;
        this.clNo = clNo;
        this.dateTime = dateTime;
        this.kw = kw;
    }

    public Measures() {
    }

    public Integer getIdMeasure() {
        return idMeasure;
    }

    public void setIdMeasure(Integer idMeasure) {
        this.idMeasure = idMeasure;
    }

    public Integer getClNo() {
        return clNo;
    }

    public void setClNo(Integer clNo) {
        this.clNo = clNo;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public double getKw() {
        return kw;
    }

    public void setKw(double kw) {
        this.kw = kw;
    }
    
}
