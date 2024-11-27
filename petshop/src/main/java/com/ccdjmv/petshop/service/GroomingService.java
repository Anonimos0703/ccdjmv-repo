package com.ccdjmv.petshop.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.AppointmentEntity;
import com.ccdjmv.petshop.entity.GroomingEntity;
import com.ccdjmv.petshop.repository.AppointmentRepository;
import com.ccdjmv.petshop.repository.GroomingRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GroomingService {

	@Autowired
	
	
	
	 private final GroomingRepository grev;
	    private final AppointmentRepository appointmentRepository;


	    @Autowired
	    public GroomingService(AppointmentRepository appointmentRepository,GroomingRepository grev) {
	        this.appointmentRepository = appointmentRepository;
	        this.grev = grev;
	    }
	 
	
	
	//read
	public List<GroomingEntity> getAllGrooming(){
		return grev.findAll();
	}
	
	//create
	public GroomingEntity addGrooming(GroomingEntity grooming) {
		return grev.save(grooming);
	}
	
	//update
	public GroomingEntity updateGrooming(int GroomingId, GroomingEntity grooming) {
		GroomingEntity existingGrooming = grev.findById(GroomingId)
                .orElseThrow(() -> new NoSuchElementException("Department with id " + GroomingId + " not found"));
		
		existingGrooming.setGroomingId(grooming.getGroomingId());
        existingGrooming.setPrice(grooming.getPrice());
        existingGrooming.setGroomService(grooming.getGroomService());
        
        return grev.save(existingGrooming);
	}
	
	//delete
	public String deleteGrooming(int GroomingId) {
		String msg;
		if (grev.existsById(GroomingId)) {
            grev.deleteById(GroomingId); // Correctly delete the entity by ID
            msg = "Course record successfully deleted.";
        } else {
            msg = "Course with id " + GroomingId + " not found.";
        }

        return msg;
	}
	
	public GroomingEntity getGroomingWithAppointments(int GroomingId) {
	    return grev.findById(GroomingId)
	            .orElseThrow(() -> new EntityNotFoundException("Grooming not found"));
	}
	
	


}
