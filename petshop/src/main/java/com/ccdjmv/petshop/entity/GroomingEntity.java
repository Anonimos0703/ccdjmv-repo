package com.ccdjmv.petshop.entity;

import java.util.List;


import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "tblgrooming")
public class GroomingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groomingId;  // Changed from int to Integer
    
    private Integer price;  // Changed from int to Integer
    

    private String groomService;  // Keep naming consistent (camelCase)
    
    @OneToMany(mappedBy = "grooming", cascade = CascadeType.ALL)
    private List<AppointmentEntity> appointments;

    // Update constructor
    public GroomingEntity(Integer groomingId, Integer price, String groomService) {
        super();
        this.groomingId = groomingId;
        this.price = price;
        this.groomService = groomService;
    }

    public GroomingEntity() {
    }

    // Update getters and setters
    public Integer getGroomingId() {
        return groomingId;
    }

    public void setGroomingId(Integer groomingId) {
        this.groomingId = groomingId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getGroomService() {
        return groomService;
    }

    public void setGroomService(String groomService) {
        this.groomService = groomService;
    }

//    public List<AppointmentEntity> getAppointments() {  
//        return appointments;
//    }
//
//    public void setAppointments(List<AppointmentEntity> appointments) { 
//        this.appointments = appointments;
//    }
}
