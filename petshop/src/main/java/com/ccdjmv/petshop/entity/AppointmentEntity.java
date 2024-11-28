package com.ccdjmv.petshop.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;




@Entity
@Table(name = "tblappointments")
public class AppointmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appId;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date;
    private String email;       
    private String contactNo;    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    private LocalTime time;
    
    private boolean canceled = false; 
    
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "grooming_id")
    @JsonBackReference("grooming-appointment")
    private GroomingEntity grooming;

    @ManyToOne(fetch = FetchType.LAZY, cascade  = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
    @JsonBackReference("customer-appointment")
    private CustomerEntity customer;

    
    public AppointmentEntity() {
    }
    
    public AppointmentEntity(Integer appId, Date date, String email, String contactNo, LocalTime time, boolean canceled) {
    	super();
        this.appId = appId;
//        this.customerId = customerId;
        this.canceled = canceled;
        this.date = date;
        this.email = email;
        this.contactNo = contactNo;
        this.time = time;
    }
    
    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
    
    public boolean isCanceled() {
        return canceled;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
    }

    // Getters and Setters
    public Integer getAppId() {
        return appId;
    }
    
    public void setAppId(Integer appId) {
        this.appId = appId;
    }
    
//    public String getCustomerId() {
//        return customerId;
//    }
//    
//    public void setCustomerId(String customerId) {
//        this.customerId = customerId;
//    }
    
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
    
    public CustomerEntity getCustomer() {
    	return customer;
    }
    
    public void setCustomer(CustomerEntity customer) {
    	this.customer = customer;
    }
}