package com.cleanstreet.backend.controller;

import com.cleanstreet.backend.dto.ComplaintCreationDTO;
import com.cleanstreet.backend.dto.ComplaintDTO;
import com.cleanstreet.backend.entity.Complaint;
import com.cleanstreet.backend.entity.Status;
import com.cleanstreet.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/complaints")
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
public class ComplaintController {

    private final ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Complaint> createComplaint(@RequestPart(value = "complaint", required = false) ComplaintCreationDTO complaintDTO,
                                                     @RequestPart(value = "image", required = false) MultipartFile image) {
        Complaint createdComplaint = complaintService.createComplaint(complaintDTO, image);
        return new ResponseEntity<>(createdComplaint, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ComplaintDTO>> getAllComplaints() {
        List<ComplaintDTO> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER') and authentication.principal.id == #userId)")
    public ResponseEntity<List<ComplaintDTO>> getComplaintsByUser(@PathVariable Long userId) {
        List<ComplaintDTO> complaints = complaintService.getComplaintsByUser(userId);
        return ResponseEntity.ok(complaints);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER') and @complaintServiceImpl.getComplaintById(#id).isPresent() and @complaintServiceImpl.getComplaintById(#id).get().getUser().getId() == authentication.principal.id)")
    public ResponseEntity<ComplaintDTO> getComplaintById(@PathVariable Long id) {
        Optional<ComplaintDTO> complaint = complaintService.getComplaintById(id);
        return complaint.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping(value="/{id}",consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN') or @complaintServiceImpl.isUserComplaintOwnerAndOpen(#id, authentication.principal.id)")
    public ResponseEntity<Complaint> updateComplaint(@PathVariable Long id, @RequestPart(value = "complaint", required = false) ComplaintCreationDTO updatedComplaint,
    		@RequestPart(value = "image", required = false) MultipartFile image) {
        Complaint complaint = complaintService.updateComplaint(id, updatedComplaint,image);
        return ResponseEntity.ok(complaint);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or (hasRole('USER') and @complaintServiceImpl.getComplaintById(#id).isPresent() and @complaintServiceImpl.getComplaintById(#id).get().getUser().getId() == authentication.principal.id)")
    public ResponseEntity<Void> deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateStatus(@PathVariable Long id,@RequestParam Status status){
    	complaintService.updateStatus(id,status);
    	return ResponseEntity.ok("complaint status updated to: "+status.name());
    }
} 