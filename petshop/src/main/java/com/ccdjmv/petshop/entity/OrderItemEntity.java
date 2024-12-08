package com.ccdjmv.petshop.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderItemID;
    private int quantity;

//    MIGHT CHANGE TO CART FOR CHECKOUT
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity order;

    public OrderItemEntity() {
        super();
    }

    public OrderItemEntity(int orderItemID, int quantity) {
        this.orderItemID = orderItemID;
        this.quantity = quantity;
    }

    public int getOrderItemID() {
        return orderItemID;
    }

    public void setOrderItemID(int orderItemID) {
        this.orderItemID = orderItemID;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }
}