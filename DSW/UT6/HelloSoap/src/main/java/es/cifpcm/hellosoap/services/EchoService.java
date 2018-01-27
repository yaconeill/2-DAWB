/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.hellosoap.services;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;


/**
 *
 * @author Yaco
 */
@WebService(serviceName = "EchoService")
public class EchoService {
    @WebMethod(operationName = "reply")
    public String reply(@WebParam(name = "message") String message){
        return "Echo..." + message;
    }
}
