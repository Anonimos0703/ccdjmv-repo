package com.ccdjmv.petshop.controller;

import com.ccdjmv.petshop.entity.InventoryEntity;
import com.ccdjmv.petshop.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventories")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<InventoryEntity>> getAllInventories() {
        return ResponseEntity.ok(inventoryService.getAllInventories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryEntity> getInventoryById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getInventoryById(id));
    }

    @PostMapping
    public ResponseEntity<InventoryEntity> createInventory(@RequestBody InventoryEntity inventory) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.createInventory(inventory));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryEntity> updateInventory(
            @PathVariable Long id,
            @RequestBody InventoryEntity inventoryDetails) {
        return ResponseEntity.ok(inventoryService.updateInventory(id, inventoryDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }
}
