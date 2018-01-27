/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilars_yaco.data;

import es.cifpcm.sakilars_yaco.Actor;
import java.util.List;

/**
 *
 * @author Jaime
 */
public interface ActorDao {
    public List<Actor> selectAll();
    public Actor insert(Actor elemento) throws Exception;
}
