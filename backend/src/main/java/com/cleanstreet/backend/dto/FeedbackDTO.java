package com.cleanstreet.backend.dto;

import lombok.Data;

@Data
public class FeedbackDTO {
    private String subject;
    private String message;
    private String contactName;
    private String contactEmail;
}
