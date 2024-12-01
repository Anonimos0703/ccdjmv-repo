package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.AddressEntity;
import com.ccdjmv.petshop.entity.UserEntity;
import com.ccdjmv.petshop.repository.AddressRepository;
import com.ccdjmv.petshop.repository.UserRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository; // Add this to access UserEntity

    // Add a new address to a user
    public AddressEntity addAddressToUser(Long userId, AddressEntity address) {
        Optional<UserEntity> user = userRepository.findById(userId);
        if (user.isPresent()) {
            address.setUser(user.get());
            return addressRepository.save(address);
        }
        return null;
    }

    // Get all addresses for a user
    public List<AddressEntity> getAddressesByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }

    // Update an existing address
    public AddressEntity updateAddress(Long userId, Integer addressId, AddressEntity address) {
        Optional<AddressEntity> existingAddress = addressRepository.findById(addressId);
        if (existingAddress.isPresent() && existingAddress.get().getUser().getId().equals(userId)) {
            // Update the existing address fields
            AddressEntity addressToUpdate = existingAddress.get();
            addressToUpdate.setRegion(address.getRegion());
            addressToUpdate.setProvince(address.getProvince());
            addressToUpdate.setCity(address.getCity());
            addressToUpdate.setBarangay(address.getBarangay());
            addressToUpdate.setPostalCode(address.getPostalCode());
            addressToUpdate.setBuildingHouseNo(address.getBuildingHouseNo());
            return addressRepository.save(addressToUpdate);
        }
        return null; // If address is not found or user doesn't match
    }

    // Delete an address
    public void deleteAddress(Long userId, Integer addressId) {
        Optional<AddressEntity> address = addressRepository.findById(addressId);
        if (address.isPresent() && address.get().getUser().getId().equals(userId)) {
            addressRepository.deleteById(addressId);
        }
    }
}
