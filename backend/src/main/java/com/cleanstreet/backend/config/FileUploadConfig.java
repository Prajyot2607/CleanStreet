package com.cleanstreet.backend.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class FileUploadConfig implements WebMvcConfigurer{
	
    @Value("${file.upload-dir}")
    private String uploadDir;
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
		registry.addResourceHandler("/uploads/**")
		.addResourceLocations("file:" + uploadPath.toString() + "/");
	}
	

}
