package com.cleanstreet.backend.service;

import java.util.List;

import com.cleanstreet.backend.entity.Feedback;

public interface FeedbackService {
    Feedback saveFeedback(Feedback feedback);
    List<Feedback> getAllFeedback();
}
