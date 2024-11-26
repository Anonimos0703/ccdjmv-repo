package com.ccdjmv.petshop.service;

import java.util.List;
//import java.util.Optional;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccdjmv.petshop.entity.AppointmentEntity;
import com.ccdjmv.petshop.repository.AppointmentRepository;


@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    public AppointmentService() {
    	super();
    }
    //read
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentRepository.findAll();
    }

//    public Optional<AppointmentEntity> getAppointmentById(String appId) {
//        return appointmentRepository.findById(appId);
//    }

    //create
    public AppointmentEntity addAppointment(AppointmentEntity appointment) {
        return appointmentRepository.save(appointment);
    }

    //update
    public AppointmentEntity updateAppointment(int appid,AppointmentEntity appointment) {
    	
    	AppointmentEntity existingAppointment = appointmentRepository.findById(appid)
                .orElseThrow(() -> new NoSuchElementException("Appointment with id " + appid + " not found"));

        // Update fields
//        existingAppointment.setCustomerId(appointment.getCustomerId());
        existingAppointment.setEmail(appointment.getEmail());
        existingAppointment.setContactNo(appointment.getContactNo());
        existingAppointment.setDate(appointment.getDate());
        

        return appointmentRepository.save(existingAppointment);
    }

   //delete
    public String deleteAppointment(int appid) {
        String msg;

        if (appointmentRepository.existsById(appid)) {
            appointmentRepository.deleteById(appid); // Correctly delete the entity by ID
            msg = "Appointment record successfully deleted.";
        } else {
            msg = "Appointment with id " + appid + " not found.";
        }

        return msg;
    }
    
    public List<AppointmentEntity> getAppointmentByUser(String email) {
        return appointmentRepository.findByEmail(email);
    }

}
