package com.ccdjmv.petshop.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.Date;




@Entity
@Table(name = "tblappointments")
public class AppointmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appId;
    
    private String customerId;
    private Date date;
    private String email;       
    private String contactNo;    
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "grooming")
	
	private GroomingEntity grooming;
    
    public AppointmentEntity() {
    }
    
    public AppointmentEntity(Integer appId, String customerId, Date date, String email, String contactNo) {
    	super();
        this.appId = appId;
        this.customerId = customerId;
        this.date = date;
        this.email = email;
        this.contactNo = contactNo;
    }
    
    // Getters and Setters
    public Integer getAppId() {
        return appId;
    }
    
    public void setAppId(Integer appId) {
        this.appId = appId;
    }
    
    public String getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    
    public Date getDate() {
        return date;
    }
    
    public void setDate(Date date) {
        this.date = date;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getContactNo() {
        return contactNo;
    }
    
    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }
    
    public GroomingEntity getGrooming() {
    	return grooming;
    }
    
    public void setGrooming(GroomingEntity grooming) {
    	this.grooming = grooming;
    }
}