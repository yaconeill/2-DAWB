package es.cifpcm.sakilars_daniel.data;

import es.cifpcm.sakilars_daniel.pojos.Actor;
import java.util.List;


public interface ActorDao {
    public List<Actor> selectAll();
    public Actor insert (Actor actor);
}
