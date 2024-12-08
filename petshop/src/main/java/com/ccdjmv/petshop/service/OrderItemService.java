package com.ccdjmv.petshop.service;

import com.ccdjmv.petshop.entity.OrderItemEntity;
import com.ccdjmv.petshop.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderItemService {

    @Autowired
    OrderItemRepository oirepo;

    public OrderItemService() {
        super();
    }

    public OrderItemEntity postOrderItemRecord(OrderItemEntity orderItem) {
        return oirepo.save(orderItem);
    }

    public List<OrderItemEntity> getAllOrderItem() {
        return oirepo.findAll();
    }

    @SuppressWarnings("finally")
    public OrderItemEntity putOrderItemDetails(int id, OrderItemEntity newOrderItemDetails) {
        OrderItemEntity orderItem = new OrderItemEntity();

        try {
            orderItem = oirepo.findById(id).get();

            orderItem.setQuantity(newOrderItemDetails.getQuantity());
        } catch(NoSuchElementException nex) {
            throw new NameNotFoundException("Order " + id + " not found");
        } finally {
            return oirepo.save(orderItem);
        }
    }

    public String deleteItemOrder(int id) {
        String msg = "";
        if(oirepo.findById(id).isPresent()) {
            oirepo.deleteById(id);
            msg = "Order successfully deleted!";
        } else {
            msg = id +  " NOT found";
        }
        return msg;
    }
}