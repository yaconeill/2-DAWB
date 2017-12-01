/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.bean;

import java.util.List;

/**
 *
 * @author Yaco
 */
public interface ActorDao {

    public List<Actor> getAllActors();

    public Actor getActor(int id);

    public void updateActor(Actor actor);

    public void deleteActor(Actor actor);
}
