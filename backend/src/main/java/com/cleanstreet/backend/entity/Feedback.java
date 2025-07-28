package com.cleanstreet.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "feedbacks")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    @Column(length = 2000)
    private String message;

    private String contactName;
    private String contactEmail;

   
}
