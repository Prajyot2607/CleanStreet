package com.cleanstreet.backend.dto;

import com.cleanstreet.backend.entity.Status;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintDTO {

    private Long id;
    private String title;
    private String description;
    private Status status;
    private String imageUrl;
    private LocalDateTime timestamp;
    private UserDTO user;
    private LocationDTO location;
} 