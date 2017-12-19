/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf.web.bean;

import es.cifpcm.sakilajsf.data.CustomerDAO;
import es.cifpcm.sakilajsf.data.CustomerDAOImpl;
import es.cifpcm.sakilajsf.web.model.Customer;
import java.util.ArrayList;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Manuel Melián Hernández
 */
@Named(value = "customerBean")
@ApplicationScoped
public class CustomerBean extends Customer {
    List<Customer> customers = new ArrayList<>();
    /**
     * Creates a new instance of CustomerBean
     */
    public CustomerBean() {}

    @NotNull(message = "El apellido no puede estar vacío")
    @Size(min = 1, message = "El apellido no puede estar vacío")
    @Override
    public String getLastName() {
        return super.getLastName(); //To change body of generated methods, choose Tools | Templates.
    }

    @NotNull(message = "El nombre no puede estar vacío")
    @Size(min = 1, message = "El nombre no puede estar vacío")
    @Override
    public String getFirstName() {
        return super.getFirstName(); //To change body of generated methods, choose Tools | Templates.
    }
    
    @NotNull(message = "La id de la dirección no puede estar vacía")
    @Size(min = 1, message = "La id de la dirección no puede estar vacía")
    @Override
    public int getAddressId() {
        return super.getAddressId(); //To change body of generated methods, choose Tools | Templates.
    }

    public String save() throws Exception {
        boolean correcto = true;
        try {
            CustomerDAO dao = new CustomerDAOImpl();
            dao.insert(this);
        } catch(Exception ex) {
            correcto = false;
        }
        if(correcto)
            return "customerDetail?faces-redirect=true";
        else
            return "/error?faces-redirect=true";
    }
    
    public List<Customer> getCustomers(){
        CustomerDAO dao = new CustomerDAOImpl();
        this.customers.addAll(dao.selectAll());
        return this.customers;
    }
}
