/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilars_yaco.services.rest;

import es.cifpcm.sakilars_yaco.Actor;
import es.cifpcm.sakilars_yaco.data.ActorDao;
import es.cifpcm.sakilars_yaco.data.ActorDaoImpl;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 *
 * @author Yaco
 */
@Path ("actors")
public class ActorRest {

    private List<Actor> selectActors;
    public ActorRest() {
    }
    
    @GET
    @Produces("text/html")
    public String readActors(){
        ActorDao ad = new ActorDaoImpl();
        selectActors = ad.selectAll();
        return "<html lang=\"en\"><body><h1>"+selectActors.get(0).getFirstName()+"</h1></body></html>";
    }
}
