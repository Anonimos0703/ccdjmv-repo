package com.ccdjmv.petshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ccdjmv.petshop.entity.AddressEntity;
import com.ccdjmv.petshop.service.AddressService;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:5173")
public class AddressController {

    @Autowired
    private AddressService addressService;

    // Add a new address for a user
    @PostMapping("/users/{userId}")
    public ResponseEntity<AddressEntity> addAddress(@PathVariable Long userId, @RequestBody AddressEntity address) {
        AddressEntity createdAddress = addressService.addAddressToUser(userId, address);
        if (createdAddress != null) {
            return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Get all addresses for a user
    @GetMapping("/users/{userId}")
    public ResponseEntity<List<AddressEntity>> getAddresses(@PathVariable Long userId) {
        List<AddressEntity> addresses = addressService.getAddressesByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    // Update an address
    @PutMapping("/users/{userId}/{addressId}")
    public ResponseEntity<AddressEntity> updateAddress(@PathVariable Long userId, @PathVariable Integer addressId, @RequestBody AddressEntity address) {
        AddressEntity updatedAddress = addressService.updateAddress(userId, addressId, address);
        if (updatedAddress != null) {
            return ResponseEntity.ok(updatedAddress);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete an address
    @DeleteMapping("/users/{userId}/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long userId, @PathVariable Integer addressId) {
        addressService.deleteAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }
}
