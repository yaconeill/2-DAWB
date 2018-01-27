/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilars_yaco.web.bean;

import es.cifpcm.sakilars_yaco.Actor;
import es.cifpcm.sakilars_yaco.data.ActorDao;
import es.cifpcm.sakilars_yaco.data.ActorDaoImpl;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Yaco
 */
@Named(value = "actorBean")
@ApplicationScoped
public class ActorBean extends Actor {  
    public ActorBean() {
    }
    
    @NotNull (message = "Nombre no puede estar vacío")
    @Size(min = 1, message = "Nombre no puede estar vacío")
    @Override
    public String getFirstName() {
        return super.getFirstName();
    }
    
    @NotNull (message = "Apellidos no puede estar vacío")
    @Size(min = 1, message = "Apellidos no puede estar vacío")
    @Override
    public String getLastName() {
        return super.getLastName();
    }
    
    public List<Actor> getActorList() {
        ActorDao actorDao = new ActorDaoImpl();
        return actorDao.selectAll();
    }
    
    public String save(Actor actor) throws Exception {
        ActorDao actorDao = new ActorDaoImpl();
        Actor requestActor = actorDao.insert(actor);
        if (requestActor.getActorId() != -1) {
            return "actorDetail?faces-redirect=true";
        } else {
            return "/error?faces-redirect=true";
        }
    }
    
    public void error() {
        FacesContext.getCurrentInstance().addMessage("asd", new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error!", "Error de inserción"));
    }
}
