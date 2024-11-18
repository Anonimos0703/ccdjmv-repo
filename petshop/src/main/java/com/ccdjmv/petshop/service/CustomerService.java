package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.CustomerEntity;
import com.ccdjmv.petshop.repository.CustomerRepository;

import javax.naming.NameNotFoundException;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository crepo;

    public CustomerService() {
        super();
        // TODO Auto-generated constructor stub
    }

    //Create of CRUD
    public CustomerEntity postCustomerRecord(CustomerEntity customer) {
        return crepo.save(customer);
    }

    //Read of CRUD
    public List<CustomerEntity>getAllCustomers(){
        return crepo.findAll();
    }

    //Update of CRUD
    @SuppressWarnings("finally")
    public CustomerEntity putCustomerDetails(int id, CustomerEntity newCustomerDetails) {
        CustomerEntity customer = new CustomerEntity();

        try {
            // Search for the customer by ID
            customer = crepo.findById(id).get();
//            customer = crepo.findById(customerId).orElseThrow(() ->
//                    new NoSuchElementException("Customer " + customerId + " does not exist"));

            // If ID found, set new values
            customer.setFirstName(newCustomerDetails.getFirstName());
            customer.setLastName(newCustomerDetails.getLastName());
            customer.setPassword(newCustomerDetails.getPassword());
            customer.setEmail(newCustomerDetails.getEmail());
            customer.setContactNo(newCustomerDetails.getContactNo());
            customer.setBarangay(newCustomerDetails.getBarangay());
            customer.setStreet(newCustomerDetails.getStreet());
            customer.setCity(newCustomerDetails.getCity());
            customer.setProvince(newCustomerDetails.getProvince());
            customer.setZip(newCustomerDetails.getZip());

            // Save the updated customer
//            return crepo.save(customer);
        } catch (NoSuchElementException nex) {
            throw new NameNotFoundException("Customer " + id + " not found"); // Re-throw the exception
        } finally {
            return crepo.save(customer);
        }
    }

    //Delete of CRUD
    public String deleteCustomer(int id) {
        String msg = "";
        if (crepo.findById(id).isPresent()) {
            crepo.deleteById(id);
            msg = "Customer successfully deleted!";
        }else {
            msg = "Customer " + id + " does not exist";
        }
        return msg;
    }

}
