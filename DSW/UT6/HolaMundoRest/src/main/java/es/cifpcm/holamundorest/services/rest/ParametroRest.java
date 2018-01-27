/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.holamundorest.services.rest;

import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

/**
 *
 * @author Yaco
 */
@Path("/lista")
public class ParametroRest {

    public ParametroRest() {
    }
    
    @GET
    @Produces("text/html")
    public String getItems(@QueryParam("item") List<String> items){
        StringBuffer sb = new StringBuffer();
        sb.append("<html lang=\"en\"><body><h1>Lista de Items</h1><p>Los Items adquiridos son:</p><ul>");
        for (String item:items)
            sb.append("<li>").append(item).append("</li>");
        sb.append("</ul></body></html>");
        return sb.toString();
    }
    
}
