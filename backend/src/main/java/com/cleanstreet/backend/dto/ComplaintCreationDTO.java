package com.cleanstreet.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintCreationDTO {
    private String title;
    private String description;
    private String imageUrl;
    private Long userId;
    private String locationAddress;
} 