package com.cleanstreet.backend.repository;

import com.cleanstreet.backend.entity.Complaint;
import com.cleanstreet.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserId(Long userId);
    List<Complaint> findByIdAndUser(Long id, User user);
    List<Complaint> findByUser(User user);
} 