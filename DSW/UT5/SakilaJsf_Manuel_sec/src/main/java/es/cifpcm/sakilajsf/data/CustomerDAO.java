/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf.data;

import es.cifpcm.sakilajsf.web.model.Customer;
import java.util.List;

/**
 *
 * @author Manuel Melián Hernández
 */
public interface CustomerDAO {
    public List<Customer> selectAll();
    public Customer insert(Customer elemento) throws Exception;
}
