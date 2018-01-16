/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;

/**
 *
 * @author Yaco
 */
@Named(value = "calendarManageBean")
@RequestScoped
public class CalendarManageBean {
    private Date fechaEntrada;    
    private Date fechaSalida;

    public Date getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(Date fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }
    
    public CalendarManageBean() {
    }
    
    public Date getCurrentDate(){
        return new Date();
    }
    
    public void onEntradaChange(){
        fechaSalida = fechaEntrada;
    }
    
    
}
