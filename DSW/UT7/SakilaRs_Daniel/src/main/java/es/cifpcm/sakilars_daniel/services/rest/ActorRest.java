package es.cifpcm.sakilars_daniel.services.rest;

import es.cifpcm.sakilars_daniel.data.ActorDao;
import es.cifpcm.sakilars_daniel.data.ActorDaoImpl;
import es.cifpcm.sakilars_daniel.pojos.Actor;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;

/**
 *
 * @author alumno
 */
@Path ("actors")
public class ActorRest {
    private List<Actor> actorList;
    
    public ActorRest() {
        
    }
    
    @GET
    @Produces("application/json")
    public List<Actor> getActors(){
        ActorDao a = new ActorDaoImpl();
        actorList = a.selectAll();
        return actorList;
    }
}