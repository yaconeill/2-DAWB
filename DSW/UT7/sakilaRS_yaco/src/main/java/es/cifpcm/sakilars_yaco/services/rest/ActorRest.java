package es.cifpcm.sakilars_yaco.services.rest;

import es.cifpcm.sakilars_yaco.Actor;
import es.cifpcm.sakilars_yaco.data.ActorDao;
import es.cifpcm.sakilars_yaco.data.ActorDaoImpl;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import javax.ws.rs.*;
import org.primefaces.json.JSONArray;

/**
 *
 * @author Yaco
 */
@Path("actors")
public class ActorRest {

    private List<Actor> selectActors;

    public ActorRest() {

    }

    @GET
    @Produces("application/json")
    public String readActors() {
        ActorDao ad = new ActorDaoImpl();
        selectActors = ad.selectAll();
        JSONArray selectActorsJson = new JSONArray(selectActors);
        return selectActorsJson.toString();
    }

    @POST
    @Path("{actor}")
    @Consumes("application/json")
    public String readOneActor(@PathParam("{actor}") JSONArray actor) throws Exception {
        ActorDao ad = new ActorDaoImpl();
        Actor newActor = new Actor();
//        newActor.setFirstName(actor);
//        newActor.setLastName(actor);
        ad.insert(newActor);
        JSONArray selectActorsJson = new JSONArray(selectActors.get(0));
        return selectActorsJson.toString();
    }
}
