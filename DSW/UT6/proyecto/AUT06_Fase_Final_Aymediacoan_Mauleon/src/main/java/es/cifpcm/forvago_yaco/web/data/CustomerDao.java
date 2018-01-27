/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.data;

import es.cifpcm.forvago_yaco.web.model.Customer;

/**
 *
 * @author Yaco
 */
public interface CustomerDao {

    public Customer insert(Customer customer);

    public Customer update(Customer customer);

    public Customer delete(Customer customer);
}
