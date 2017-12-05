/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.bean;

import es.cifpcm.sakilajsf_yaco.web.model.Actor;
import es.cifpcm.sakilajsf_yaco.web.data.ActorDao;
import es.cifpcm.sakilajsf_yaco.web.data.ActorDaoImpl;
import java.util.List;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.validation.constraints.NotNull;

/**
 *
 * @author Yaco
 */
@Named(value = "actorBean")
@RequestScoped
public class ActorBean extends Actor {

    /**
     * Creates a new instance of ActorBean
     */
    public ActorBean() {

    }

    public List<Actor> getActorList() {
        ActorDaoImpl actorDao = new ActorDaoImpl();
        return actorDao.selectAll();
    }

    public String save() {
        Actor newActor = new ActorDaoImpl().insert(this);
        this.setId(newActor.getId());
        return "actorDetails.xhtml?faces-redirect=true";
    }

    @NotNull(message = "Apellidos no puede estar vacío")
    @Override
    public String getLastName() {
        return super.getLastName();
    }
}
