/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.bean;

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
public class ActorBean {

    /**
     * Creates a new instance of ActorBean
     */
    private final List<Actor> actorList = new ArrayList<>();
    
    public ActorBean() {   
        
    }

    public List<Actor> getActorList() {        
        return this.actorList;
    }
    
}
