package com.cleanstreet.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String areaName;
    private String city;
    private String pincode;

    // Relationships
    // @OneToMany(mappedBy = "location")
    // private List<Complaint> complaints;
} 