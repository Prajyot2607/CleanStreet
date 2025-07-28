package com.cleanstreet.backend.service;

import com.cleanstreet.backend.dto.UserDTO;
import com.cleanstreet.backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User registerUser(User user);
    Optional<User> loginUser(String email, String password);
    List<UserDTO> getAllUsers();
    void deleteUser(Long id);
    Optional<UserDTO> getUserById(Long id);
	User getCurrentUser();
} 