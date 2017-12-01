/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.bean;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Yaco
 */
public class ActorDaoImpl implements ActorDao {

    List<Actor> actors;

    public ActorDaoImpl() {
        actors = new ArrayList<>();
        Actor newActor = new Actor();
        actors.add(newActor);
    }

    @Override
    public void deleteActor(Actor actor) {
        actors.remove(actor);
    }

    @Override
    public List<Actor> getAllActors() {
        return actors;
    }

    @Override
    public Actor getActor(int id) {
        return actors.get(id);
    }

    @Override
    public void updateActor(Actor actor) {
        actors.get(actor.getId()).setName(actor.getName());
    }
}
