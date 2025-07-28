package com.cleanstreet.backend.service;

import com.cleanstreet.backend.dto.LocationDTO;
import com.cleanstreet.backend.entity.Location;

import java.util.List;
import java.util.Optional;

public interface LocationService {

    Location addLocation(Location location);
    Location findOrCreateLocation(String areaName);
    List<LocationDTO> getAllLocations();
    Optional<LocationDTO> getLocationById(Long id);
    Location updateLocation(Long id, Location updatedLocation);
    void deleteLocation(Long id);
} 