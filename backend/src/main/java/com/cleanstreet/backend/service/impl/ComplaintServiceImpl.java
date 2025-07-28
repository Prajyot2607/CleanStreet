package com.cleanstreet.backend.service.impl;

import com.cleanstreet.backend.dto.ComplaintCreationDTO;
import com.cleanstreet.backend.dto.ComplaintDTO;
import com.cleanstreet.backend.dto.LocationDTO;
import com.cleanstreet.backend.dto.UserDTO;
import com.cleanstreet.backend.entity.Complaint;
import com.cleanstreet.backend.entity.Location;
import com.cleanstreet.backend.entity.Status;
import com.cleanstreet.backend.entity.User;
import com.cleanstreet.backend.repository.ComplaintRepository;
import com.cleanstreet.backend.repository.LocationRepository;
import com.cleanstreet.backend.repository.UserRepository;
import com.cleanstreet.backend.service.ComplaintService;
import com.cleanstreet.backend.service.FileStorageService;
import com.cleanstreet.backend.service.LocationService;
import com.cleanstreet.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ComplaintServiceImpl implements ComplaintService {

	private final ComplaintRepository complaintRepository;
	private final UserRepository userRepository;
	private final LocationService locationService;
	private final UserService userservice;
	private final FileStorageService fileStorageService;

	@Autowired
	public ComplaintServiceImpl(ComplaintRepository complaintRepository, UserRepository userRepository,
			LocationService locationService, UserService userservice, FileStorageService fileStorageService) {
		this.complaintRepository = complaintRepository;
		this.userRepository = userRepository;
		this.locationService = locationService;
		this.userservice = userservice;
		this.fileStorageService = fileStorageService;
	}

	@Override
	public Complaint createComplaint(ComplaintCreationDTO complaintDTO, MultipartFile image) {
		// Ensure user exists
//        User user = userRepository.findById(complaintDTO.getUserId())
//                .orElseThrow(() -> new RuntimeException("User not found with id " + complaintDTO.getUserId()));
		User user = userservice.getCurrentUser();

		// Find or create location by address
		Location location = locationService.findOrCreateLocation(complaintDTO.getLocationAddress());

		Complaint complaint = new Complaint();
		complaint.setTitle(complaintDTO.getTitle());
		complaint.setDescription(complaintDTO.getDescription());
		complaint.setTimestamp(LocalDateTime.now()); // Set current timestamp
		complaint.setUser(user);
		complaint.setLocation(location);
		// Set initial status, e.g., Status.OPEN or Status.PENDING
		complaint.setStatus(Status.OPEN);

		if (image != null && !image.isEmpty()) {
			String imageUrl = fileStorageService.storeFile(image);
			complaint.setImageUrl(imageUrl);
		}

		return complaintRepository.save(complaint);
	}

	@Override
	public List<ComplaintDTO> getAllComplaints() {
		return complaintRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
	}

	@Override
	public List<ComplaintDTO> getComplaintsByUser(Long userId) {
		User user = userservice.getCurrentUser();
		return complaintRepository.findByUserId(userId).stream().map(this::convertToDto).collect(Collectors.toList());
	}

	@Override
	public Optional<ComplaintDTO> getComplaintById(Long id) {
		User currentUser = userservice.getCurrentUser();
		List<Complaint> complaint = complaintRepository.findByIdAndUser(id, currentUser);
		return complaintRepository.findById(id).map(this::convertToDto);
	}

	@Override
	public Complaint updateComplaint(Long id, ComplaintCreationDTO updatedComplaint, MultipartFile image) {
		Location location = locationService.findOrCreateLocation(updatedComplaint.getLocationAddress());
		return complaintRepository.findById(id)

				.map(complaint -> {

					complaint.setTitle(updatedComplaint.getTitle());
					complaint.setDescription(updatedComplaint.getDescription());

					// Assuming user and location are not updated via this method, or handled
					// separately

					complaint.setLocation(location);

					if (image != null && !image.isEmpty()) {
						String imageUrl = fileStorageService.storeFile(image);
						complaint.setImageUrl(imageUrl);
					}

					return complaintRepository.save(complaint);
				}).orElseThrow(() -> new RuntimeException("Complaint not found with id " + id)); // Basic exception
																									// handling
	}

	@Override
	public void deleteComplaint(Long id) {
		complaintRepository.deleteById(id);
	}

	@Override
	public boolean isUserComplaintOwnerAndOpen(Long complaintId, Long userId) {
		Optional<Complaint> complaintOptional = complaintRepository.findById(complaintId);
		return complaintOptional.map(
				complaint -> complaint.getUser().getId().equals(userId) && complaint.getStatus().equals(Status.OPEN))
				.orElse(false);
	}

	@Override
	public void updateStatus(Long id, Status status) {
		Complaint complaint = complaintRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Complaint not found with id " + id));
		complaint.setStatus(status);
		complaintRepository.save(complaint);
	}

	private ComplaintDTO convertToDto(Complaint complaint) {
		ComplaintDTO complaintDTO = new ComplaintDTO();
		complaintDTO.setId(complaint.getId());
		complaintDTO.setTitle(complaint.getTitle());
		complaintDTO.setDescription(complaint.getDescription());
		complaintDTO.setStatus(complaint.getStatus());
		complaintDTO.setImageUrl(complaint.getImageUrl());
		complaintDTO.setTimestamp(complaint.getTimestamp());

		// Convert related entities to DTOs
		if (complaint.getUser() != null) {
			UserDTO userDTO = new UserDTO();
			userDTO.setId(complaint.getUser().getId());
			userDTO.setName(complaint.getUser().getName());
			userDTO.setEmail(complaint.getUser().getEmail());
			userDTO.setRole(complaint.getUser().getRole());
			complaintDTO.setUser(userDTO);
		}

		if (complaint.getLocation() != null) {
			LocationDTO locationDTO = new LocationDTO();
			locationDTO.setId(complaint.getLocation().getId());
			locationDTO.setAreaName(complaint.getLocation().getAreaName());
			locationDTO.setCity(complaint.getLocation().getCity());
			locationDTO.setPincode(complaint.getLocation().getPincode());
			complaintDTO.setLocation(locationDTO);
		}

		return complaintDTO;
	}

}
