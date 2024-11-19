package com.ccdjmv.petshop.controller;

import com.ccdjmv.petshop.entity.UserEntity;
import com.ccdjmv.petshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired	
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserEntity user) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered.");
        }

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("CUSTOMER");
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserEntity user) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isEmpty() || !existingUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password."));
        }

        String role = existingUser.get().getRole();
        String message;
        if ("ADMIN".equalsIgnoreCase(role)) {
            message = "Admin login successful!";
        } else if ("CUSTOMER".equalsIgnoreCase(role)) {
            message = "Customer login successful!";
        } else {
            return ResponseEntity.status(403).body(Map.of("message", "Role not recognized."));
        }
        return ResponseEntity.ok(Map.of("message", message, "username", existingUser.get().getUsername(), "role", role));
    }

}
