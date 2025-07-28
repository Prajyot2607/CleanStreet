package com.cleanstreet.backend.controller;

import com.cleanstreet.backend.dto.UserDTO;
import com.cleanstreet.backend.entity.User;
import com.cleanstreet.backend.entity.CustomUserDetails;
import com.cleanstreet.backend.service.UserService;
import com.cleanstreet.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
// Enable method-level security for user-related endpoints
// Public access to register and login is handled in SecurityConfig
@PreAuthorize("isAuthenticated()") // Require authentication for other user endpoints by default
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    // Publicly accessible - handled in SecurityConfig
    @PreAuthorize("permitAll()")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    // Publicly accessible - handled in SecurityConfig
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        Optional<User> authenticatedUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (authenticatedUser.isPresent()) {
            User loggedInUser = authenticatedUser.get();
            
            // Create CustomUserDetails object from loggedInUser
            CustomUserDetails userDetails = new CustomUserDetails(loggedInUser);

            // Generate JWT token using CustomUserDetails
            String token = jwtUtil.generateToken(userDetails);

            // Return user details and JWT token
            Map<String, Object> response = new HashMap<>();
            response.put("id", loggedInUser.getId());
            response.put("name", loggedInUser.getName());
            response.put("email", loggedInUser.getEmail());
            response.put("role", loggedInUser.getRole());
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers(); // get list
        return ResponseEntity.ok(users); // wrap in ResponseEntity
    }
    

    @GetMapping("/{id}")
    // User can get their own details OR Admin can get any user's details
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        Optional<UserDTO> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    // Only ADMIN can delete users
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
} 