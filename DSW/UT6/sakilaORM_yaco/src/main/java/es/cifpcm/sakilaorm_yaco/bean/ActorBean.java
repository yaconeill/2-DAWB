/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilaorm_yaco.bean;

import es.cifpcm.sakilaorm_yaco.model.Actor;
import es.cifpcm.sakilaorm_yaco.data.ActorDaoImpl;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Yaco
 */
@Named(value = "actorBean")
@ApplicationScoped
public class ActorBean extends Actor {

    /**
     * Creates a new instance of ActorBean
     */
    public ActorBean() {

    }

    public List<Actor> getActorList() {
//        ActorDaoImpl actorDao = ;
        return new ActorDaoImpl().selectAll();
    }
    
    @NotNull(message = "Nombre no puede estar vacío")
    @Size(min = 1, message = "Nombre no puede estar vacío")
    public String getfirstName() {
        return super.getFirstName();
    }

    @NotNull(message = "Apellidos no puede estar vacío")
    @Size(min = 1, message = "Apellidos no puede estar vacío")
    @Override
    public String getLastName() {
        return super.getLastName();
    }

//    public String save() {
//        Actor actor = new ActorDaoImpl().insert(this);
//        if (actor.getActorId() != -1) {
//            return "actorDetails?faces-redirect=true";
//        } else {
//            return "/error?faces-redirect=true";
//        }
//    }

    public void error() {
        FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", "Error de inserción"));
    }
}
