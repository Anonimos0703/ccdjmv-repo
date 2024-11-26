package com.ccdjmv.petshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tblcustomer")
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   
    private int customerId;

    private String firstName;
    private String lastName;
    private String email;
    private String contactNo;
    private String street;
    private String barangay;
    private String city;
    private String province;
    private int zip;
    private String password;

    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonManagedReference("customer-order")
    private List<OrderEntity> order;
    

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    @JsonBackReference("user-customer")
    private UserEntity user;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonManagedReference("customer-appointment")
    private List<AppointmentEntity>appointments;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonManagedReference("customer-productreview")
    private List<ProductReviewEntity> productreview;
    
    
    public CustomerEntity() {
        super();
    }

    public CustomerEntity(int customerId, String fName, String lName, String contactNo, String street, String barangay,
                          String city, String province, int zip, String email, String password) {
        this.customerId = customerId;
        this.firstName = fName;
        this.lastName = lName;
        this.contactNo = contactNo;
        this.street = street;
        this.barangay = barangay;
        this.city = city;
        this.province = province;
        this.zip = zip;
        this.email = email;
        this.password = password;
    }

    public int getCustomerId() {
        return customerId;
    }
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String fName) {
        this.firstName = fName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lName) {
        this.lastName = lName;
    }
    public String getContactNo() {
        return contactNo;
    }
    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getBarangay() {
        return barangay;
    }
    public void setBarangay(String barangay) {
        this.barangay = barangay;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getProvince() {
        return province;
    }
    public void setProvince(String province) {
        this.province = province;
    }
    public int getZip() {
        return zip;
    }
    public void setZip(int zip) {
        this.zip = zip;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

     
    public List<OrderEntity> getOrder() {
        return order;
    }

    public void setOrder(List<OrderEntity> order) {
        this.order = order;
    }
    
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
    
    public List<AppointmentEntity> getAppointment(){
    	return appointments;
    }
    
    public void setAppointment(List<AppointmentEntity> appointments) {
    	this.appointments = appointments;
    }
    
    public List<ProductReviewEntity> getProductReview(){
    	return productreview;
    }
    
    public void setProductReview(List<ProductReviewEntity>productreview) {
    	this.productreview = productreview;
    }
     
}