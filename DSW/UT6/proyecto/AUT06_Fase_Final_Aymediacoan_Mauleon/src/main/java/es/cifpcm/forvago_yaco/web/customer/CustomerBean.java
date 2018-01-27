/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.customer;

import es.cifpcm.forvago_yaco.web.data.CustomerDaoImpl;
import es.cifpcm.forvago_yaco.web.model.Customer;
import java.io.IOException;
import java.io.Serializable;
import javax.inject.Named;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.context.FacesContext;

/**
 *
 * @author Yaco
 */
@Named(value = "customerBean")
@ApplicationScoped
public class CustomerBean extends Customer implements Serializable{

    /**
     * Creates a new instance of CustomerBean
     */
    public CustomerBean() {
    }
    
    public void sendData() throws IOException{
        new CustomerDaoImpl().insert(this);
        FacesContext.getCurrentInstance().getExternalContext().redirect("login.xhtml");       
    }
}
