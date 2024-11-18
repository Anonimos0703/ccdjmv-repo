package com.ccdjmv.petshop.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.ccdjmv.petshop.entity.AppointmentEntity;
import com.ccdjmv.petshop.service.AppointmentService;

@CrossOrigin(origins = "http://localhost:5173") // Enable CORS for this controller
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/getAppointment")
    public List<AppointmentEntity> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

//    @GetMapping("/getAppointment")
//    public ResponseEntity<AppointmentEntity> getAppointmentById(@PathVariable String appId) {
//        return appointmentService.getAppointmentById(appId)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
    
     
    @PostMapping("/postAppointment")
    public AppointmentEntity addAppointment(@RequestBody AppointmentEntity appointment) {
        return appointmentService.addAppointment(appointment);
    }

    @PutMapping("/putAppointment/{appid}")
    public AppointmentEntity updateAppointment(@PathVariable int appid,@RequestBody AppointmentEntity appointment) {
        return appointmentService.updateAppointment(appid, appointment);
    }
    
    @DeleteMapping("/deleteAppointment/{appid}")
    public String deleteCourse(@PathVariable int appid) {
        return appointmentService.deleteAppointment(appid);
    }
}