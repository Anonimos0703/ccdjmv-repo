package com.ccdjmv.petshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ccdjmv.petshop.entity.CustomerEntity;
import com.ccdjmv.petshop.service.CustomerService;

@RestController
@RequestMapping(method = RequestMethod.GET, path="/api/customer")
public class CustomerController {

    @Autowired
    CustomerService cserv;

    @GetMapping("/test")
    public String test() {
        return "Test endpoint is working!";
    }

    //Create of CRUD
    @PostMapping("/postCustomerRecord")
    public CustomerEntity postCustomerRecord(@RequestBody CustomerEntity customer) {
        return cserv.postCustomerRecord(customer);
    }

    //Read of CRUD
    @GetMapping("/getAllCustomers")
    public List<CustomerEntity> getAllCustomers(){
        return cserv.getAllCustomers();
    }

    //Update of CRUD
    @PutMapping("/putCustomerDetails")
    public CustomerEntity putCustomerDetails(@RequestParam int id, @RequestBody CustomerEntity newCustomerDetails) {
        return cserv.putCustomerDetails(id, newCustomerDetails);
    }

    //Delete of CRUD
    @DeleteMapping("/deleteCustomerDetails/{id}")
    public String deleteCustomer(@PathVariable int id) {
        return cserv.deleteCustomer(id);
    }

}