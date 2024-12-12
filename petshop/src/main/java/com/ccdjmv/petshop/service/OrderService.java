package com.ccdjmv.petshop.service;

import com.ccdjmv.petshop.entity.OrderEntity;
import com.ccdjmv.petshop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderService {

    @Autowired
    OrderRepository orepo;

    public OrderService() {
        super();
    }

    public OrderEntity postOrderRecord(OrderEntity order) {
        return orepo.save(order);
    }

    public OrderService(OrderRepository orderRepository) {
        this.orepo = orderRepository;
    }

    public OrderEntity getOrderDetails(int orderID) {
        return orepo.findById(orderID)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<OrderEntity> getAllOrdersByUserId(int userId) {
        return orepo.findByUserId(userId);
    }

    public List<OrderEntity> getAllOrder() {
        return orepo.findAll();
    }

    @SuppressWarnings("finally")
    public OrderEntity putOrderDetails(int id, OrderEntity newOrderDetails) {
        OrderEntity order = new OrderEntity();

        try {
            order = orepo.findById(id).get();

            order.setOrderDate(newOrderDetails.getOrderDate());
            order.setPaymentMethod(newOrderDetails.getPaymentMethod());
            order.setPaymentStatus(newOrderDetails.getPaymentStatus());
            order.setOrderStatus(newOrderDetails.getOrderStatus());
            order.setTotalPrice(newOrderDetails.getTotalPrice());
            order.setUser(newOrderDetails.getUser());
        } catch(NoSuchElementException nex) {
            throw new NameNotFoundException("Order " + id + " not found");
        } finally {
            return orepo.save(order);
        }
    }

    public String deleteOrder(int id) {
        String msg = "";
        if(orepo.findById(id).isPresent()) {
            orepo.deleteById(id);
            msg = "Order successfully deleted!";
        } else {
            msg = id +  " NOT found";
        }
        return msg;
    }
}
