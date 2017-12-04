/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.data;

import es.cifpcm.sakilajsf_yaco.web.model.Actor;
import java.util.List;

/**
 *
 * @author Yaco
 */
public interface ActorDao {

    public List<Actor> selectAll();

    public Actor getActor(int id);

    public void updateActor(Actor actor);

    public void deleteActor(Actor actor);
}
