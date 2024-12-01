package com.ccdjmv.petshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Table(name = "tblorder")
@Entity
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderID;
    @Column
    private String orderDate;
    private String paymentMethod;
    private Double totalPrice;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productid")
    @JsonBackReference("product-order")
    private ProductEntity product;

    public OrderEntity() {
        super();
    }

    public OrderEntity(int orderID, String orderDate, String paymentMethod, Double totalPrice) {
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.totalPrice = totalPrice;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
     
    public ProductEntity getProduct() {
    	return product;
    }
    
    public void setProduct(ProductEntity product) {
    	this.product  = product;
    }
}