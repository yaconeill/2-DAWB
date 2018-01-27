/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilaorm_yaco.data;

import es.cifpcm.sakilaorm_yaco.model.Actor;
import java.util.List;

/**
 *
 * @author Yaco
 */
public interface ActorDao {

    public List<Actor> selectAll();

    public Actor getActor(int actorId);

    public void updateActor(Actor actor);

    public void deleteActor(Actor actor);

    public void insert();
}
