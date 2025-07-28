package com.cleanstreet.backend.service;

import com.cleanstreet.backend.dto.ComplaintCreationDTO;
import com.cleanstreet.backend.dto.ComplaintDTO;
import com.cleanstreet.backend.entity.Complaint;
import com.cleanstreet.backend.entity.Status;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ComplaintService {

    Complaint createComplaint(ComplaintCreationDTO complaintDTO, MultipartFile image);
    List<ComplaintDTO> getAllComplaints();
    List<ComplaintDTO> getComplaintsByUser(Long userId);
    Optional<ComplaintDTO> getComplaintById(Long id);
    Complaint updateComplaint(Long id, ComplaintCreationDTO updatedComplaint,MultipartFile image);
    void deleteComplaint(Long id);
    boolean isUserComplaintOwnerAndOpen(Long complaintId, Long userId);
    void updateStatus(Long id,Status status);
} 