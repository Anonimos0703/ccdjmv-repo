package com.ccdjmv.petshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderItemID;
    private String orderItemName;
    private String orderItemImage;
    private double price;
    private int quantity;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    public OrderItemEntity() {
        super();
    }

    public OrderItemEntity(int orderItemID, String orderItemName, String orderItemImage, double price, int quantity) {
        this.orderItemID = orderItemID;
        this.orderItemName = orderItemName;
        this.orderItemImage = orderItemImage;
        this.price = price;
        this.quantity = quantity;
    }

    public int getOrderItemID() {
        return orderItemID;
    }

    public void setOrderItemID(int orderItemID) {
        this.orderItemID = orderItemID;
    }

    public String getOrderItemName() {
        return orderItemName;
    }

    public void setOrderItemName(String orderItemName) {
        this.orderItemName = orderItemName;
    }

    public String getOrderItemImage() {
        return orderItemImage;
    }

    public void setOrderItemImage(String orderItemImage) {
        this.orderItemImage = orderItemImage;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }
}