/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.bean;

import java.util.Date;

/**
 *
 * @author Yaco
 */
public class Actor {
    private Integer id;
    private String name;
    private String lastName;
    private Date lastUpdate;

    public Actor() {
    }

    public Actor(Integer id, String name, String lastName, Date lastUpdate) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.lastUpdate = lastUpdate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
    
}
