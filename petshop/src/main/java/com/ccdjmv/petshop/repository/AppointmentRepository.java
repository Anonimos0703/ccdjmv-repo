package com.ccdjmv.petshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.ccdjmv.petshop.entity.AppointmentEntity;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> {
}
