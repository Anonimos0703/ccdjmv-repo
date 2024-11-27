package com.ccdjmv.petshop.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ccdjmv.petshop.entity.AppointmentEntity;
import com.ccdjmv.petshop.entity.GroomingEntity;
import com.ccdjmv.petshop.service.GroomingService;

@RestController
@RequestMapping("/api/grooming")
@CrossOrigin(origins = "http://localhost:5173")
public class GroomingController {

	private final GroomingService gserv;

    @Autowired
    public GroomingController(GroomingService gserv) {
        this.gserv = gserv;
    }
	 
	 @GetMapping("/getGrooming")
	    public List<GroomingEntity> getAllGrooming() {
	        return gserv.getAllGrooming();
	    }
	 
	 @PostMapping("/postGrooming")
	    public GroomingEntity addAppointment(@RequestBody GroomingEntity grooming) {
	        return gserv.addGrooming(grooming);
	    }
	 
	 @PutMapping("/putGrooming/{GroomingId}")
	    public GroomingEntity updateGrooming(@PathVariable int GroomingId,@RequestBody GroomingEntity grooming) {
	        return gserv.updateGrooming(GroomingId, grooming);
	    }
	 
	 @DeleteMapping("/deleteGrooming/{GroomingId}")
	    public String deleteGrooming(@PathVariable int GroomingId) {
	        return gserv.deleteGrooming(GroomingId);
	    }
	 
	 @GetMapping("/getGrooming/{groomingId}")
	 public GroomingEntity getGroomingWithAppointments(@PathVariable int GroomingId) {
	     return gserv.getGroomingWithAppointments(GroomingId);
	 }

	

}
