/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.manager;

import es.cifpcm.forvago_yaco.web.data.HotelDaoImpl;
import es.cifpcm.forvago_yaco.web.model.Hotel;
import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import org.primefaces.event.FileUploadEvent;

/**
 *
 * @author Yaco
 */
@Named(value = "hotelManageBean")
@ApplicationScoped
public class HotelManageBean extends Hotel implements Serializable {

    /**
     * Creates a new instance of HotelManageBean
     */
    private String fileName;
    private List<String> servicesList;
    private String[] selectedServices;

    public HotelManageBean() {
        servicesList = new ArrayList<>();
        servicesList.add("Parking");
        servicesList.add("Piscina");
        servicesList.add("Spa");
        servicesList.add("Transporte playa");
        servicesList.add("WIFI");
        servicesList.add("Discoteca");
        servicesList.add("Futbolín");
        servicesList.add("Zona recreativa");
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public List<String> getServicesList() {
        return servicesList;
    }

    public void setServicesList(List<String> servicesList) {
        this.servicesList = servicesList;
    }

    public String[] getSelectedServices() {
        return selectedServices;
    }

    public void setSelectedServices(String[] selectedServices) {
        this.selectedServices = selectedServices;
    }

    public void handleFileUpload(FileUploadEvent event) {
        FacesMessage message = new FacesMessage("Succesful", event.getFile().getFileName() + " is uploaded.");
        setFileName(event.getFile().getFileName());
        FacesContext.getCurrentInstance().addMessage(null, message);
    }

    public void sendData() throws IOException {
        String services = String.join(",", selectedServices);
        this.setServices(services);
        this.setHotelPicture(getFileName());
        new HotelDaoImpl().insert(this);
        FacesContext.getCurrentInstance().getExternalContext().redirect("../index.xhtml");
    }
}
