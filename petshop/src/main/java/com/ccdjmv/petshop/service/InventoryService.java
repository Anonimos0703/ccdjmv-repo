package com.ccdjmv.petshop.service;

import com.ccdjmv.petshop.entity.InventoryEntity;
import com.ccdjmv.petshop.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<InventoryEntity> getAllInventories() {
        return inventoryRepository.findAll();
    }

    public InventoryEntity getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with ID: " + id));
    }

    public InventoryEntity createInventory(InventoryEntity inventory) {
        return inventoryRepository.save(inventory);
    }

    public InventoryEntity updateInventory(Long id, InventoryEntity inventoryDetails) {
        InventoryEntity inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with ID: " + id));

        inventory.setDateAdded(inventoryDetails.getDateAdded());
        return inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long id) {
        InventoryEntity inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found with ID: " + id));
        inventoryRepository.delete(inventory);
    }
}
