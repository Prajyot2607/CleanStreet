package com.cleanstreet.backend.controller;

import com.cleanstreet.backend.dto.LocationDTO;
import com.cleanstreet.backend.entity.Location;
import com.cleanstreet.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/locations")
// Enable method-level security for location-related endpoints
@PreAuthorize("isAuthenticated()") // Require authentication for all location endpoints by default
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PostMapping
    // Only ADMIN can add locations
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Location> addLocation(@RequestBody Location location) {
        Location addedLocation = locationService.addLocation(location);
        return new ResponseEntity<>(addedLocation, HttpStatus.CREATED);
    }

    @GetMapping
    // Authenticated users can get all locations
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<LocationDTO>> getAllLocations() {
        List<LocationDTO> locations = locationService.getAllLocations();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{id}")
    // Authenticated users can get a location by ID
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<LocationDTO> getLocationById(@PathVariable Long id) {
        Optional<LocationDTO> location = locationService.getLocationById(id);
        return location.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    // Only ADMIN can update locations
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location updatedLocation) {
        Location location = locationService.updateLocation(id, updatedLocation);
        return ResponseEntity.ok(location);
    }

    @DeleteMapping("/{id}")
    // Only ADMIN can delete locations
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return ResponseEntity.noContent().build();
    }
} 