/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.bean;

import es.cifpcm.sakilajsf_yaco.web.model.Actor;
import es.cifpcm.sakilajsf_yaco.web.data.ActorDao;
import es.cifpcm.sakilajsf_yaco.web.data.ActorDaoImpl;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;

/**
 *
 * @author Yaco
 */
@Named(value = "actorBean")
@RequestScoped
public class ActorBean extends Actor{

    /**
     * Creates a new instance of ActorBean
     */
    
    public ActorBean() {   
        
    }

    public List<Actor> getActorList() {  
        ActorDao actorDao = new ActorDaoImpl();
        return actorDao.getAllActors();
    }
    
}
