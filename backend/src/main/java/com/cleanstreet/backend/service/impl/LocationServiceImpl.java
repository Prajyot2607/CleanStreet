package com.cleanstreet.backend.service.impl;

import com.cleanstreet.backend.dto.LocationDTO;
import com.cleanstreet.backend.entity.Location;
import com.cleanstreet.backend.repository.LocationRepository;
import com.cleanstreet.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationServiceImpl(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public Location addLocation(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public Location findOrCreateLocation(String areaName) {
        return locationRepository.findByAreaName(areaName)
                .orElseGet(() -> {
                    Location newLocation = new Location();
                    newLocation.setAreaName(areaName);
                    // You might want to set city/pincode based on external APIs or default values here
                    newLocation.setCity(newLocation.getCity()); // Placeholder
                    newLocation.setPincode(newLocation.getPincode()); // Placeholder
                    return locationRepository.save(newLocation);
                });
    }

    @Override
    public List<LocationDTO> getAllLocations() {
        return locationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<LocationDTO> getLocationById(Long id) {
        return locationRepository.findById(id)
                .map(this::convertToDto);
    }

    @Override
    public Location updateLocation(Long id, Location updatedLocation) {
        return locationRepository.findById(id)
                .map(location -> {
                    location.setAreaName(updatedLocation.getAreaName());
                    location.setCity(updatedLocation.getCity());
                    location.setPincode(updatedLocation.getPincode());
                    return locationRepository.save(location);
                })
                .orElseThrow(() -> new RuntimeException("Location not found with id " + id)); // Basic exception handling
    }

    @Override
    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }

    private LocationDTO convertToDto(Location location) {
        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setId(location.getId());
        locationDTO.setAreaName(location.getAreaName());
        locationDTO.setCity(location.getCity());
        locationDTO.setPincode(location.getPincode());
        return locationDTO;
    }
} 