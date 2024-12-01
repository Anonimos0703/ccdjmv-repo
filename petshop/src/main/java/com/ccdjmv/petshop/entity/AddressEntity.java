package com.ccdjmv.petshop.entity;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@CrossOrigin(origins = "http://localhost:5173")
@Entity
@Table(name = "addresses")
public class AddressEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressId;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "province", nullable = false)
    private String province;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "barangay", nullable = false)
    private String barangay;

    @Column(name = "postalCode", nullable = false)
    private String postalCode;

    @Column(name = "buildingHouseNo", nullable = false)
    private String buildingHouseNo;

    // Many-to-One relationship with UserEntity
    @ManyToOne
    @JsonBackReference("user-address")
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user; // User that owns this address
    
    public AddressEntity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AddressEntity(Integer addressId, String region, String province, String city, String barangay,
			String postalCode, String buildingHouseNo, UserEntity user) {
		super();
		this.addressId = addressId;
		this.region = region;
		this.province = province;
		this.city = city;
		this.barangay = barangay;
		this.postalCode = postalCode;
		this.buildingHouseNo = buildingHouseNo;
		this.user = user;
	}

	// Getter and Setter methods for Address fields
    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getBarangay() {
        return barangay;
    }

    public void setBarangay(String barangay) {
        this.barangay = barangay;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getBuildingHouseNo() {
        return buildingHouseNo;
    }

    public void setBuildingHouseNo(String buildingHouseNo) {
        this.buildingHouseNo = buildingHouseNo;
    }

    // Getter and Setter for user (Many-to-One relationship with UserEntity)
    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

}
