/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.holamundorest.services.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 *
 * @author Yaco
 */
@Path("/saludo")
public class ParametroQueryRest {

    public ParametroQueryRest() {
    }
        @GET
    @Produces("text/html")
        public String getSaludo(@QueryParam("nombre") String nombre){
            return "<html lang=\"en\"><body><h1>Hola " + nombre +"</h1></body></html>";
        }
}
