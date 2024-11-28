package com.ccdjmv.petshop.controller;

import com.ccdjmv.petshop.entity.CustomerEntity;
import com.ccdjmv.petshop.entity.UserEntity;
import com.ccdjmv.petshop.repository.UserRepository;
import com.ccdjmv.petshop.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired	
    private UserRepository userRepository;
    @Autowired
    private UserService userService;

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
        return ResponseEntity.ok(Map.of(
        	    "id", existingUser.get().getId().toString(), // Include user ID
        	    "message", message,
        	    "username", existingUser.get().getUsername(),
        	    "role", role,
        	    "email", existingUser.get().getEmail()
        	));
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Map<String, String>> getUserProfile(@PathVariable String id) {
        try {
            Long userId = Long.parseLong(id);
            Optional<UserEntity> userEntity = userRepository.findById(userId);

            if (userEntity.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("message", "User not found."));
            }

            UserEntity user = userEntity.get();
            return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "firstName", user.getFirstName(),
                "lastName", user.getLastName(),
                "email", user.getEmail(),
                "role", user.getRole()
            ));
        } catch (NumberFormatException e) {
            return ResponseEntity.status(400).body(Map.of("message", "Invalid user ID format."));
        }
    }
    
    @PostMapping("/postUser")
    public UserEntity postUser(@RequestBody UserEntity user) {
        return userService.postUser(user);
    }

}
