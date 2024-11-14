import React, { useState } from 'react';
import { Link } from 'react-router-dom'





const AppointmentForm = () => {
  
  const [formData, setFormData] = useState({
    customerId: '',
    email: '',
    contactNo: '',
    date: '',
    time: ''
  });

  const styles = {
    container: {
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'white',
      minWidth: '100vh'
    },
    formCard: {
      width: '100%',
      maxWidth: '700px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
      padding: '2.5rem',
      marginTop: '2rem',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2.5rem',
      color: '#1a1a1a',
      letterSpacing: '0.025em'
    },
    formGroup: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    label: {
      flex: '0 0 120px',
      marginBottom: '0',
      color: '#374151',
      fontSize: '0.95rem',
      fontWeight: '500'
    },
    input: {
      flex: '1',
      padding: '0.875rem 1.25rem',
      borderRadius: '8px',
      border: '1.5px solid #E5E7EB',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.2s ease',
      backgroundColor: '#FAFAFA',
      width: '90%',
      color: 'black'
    },
    button: {
      width: '90%',
      backgroundColor: '#7C3AED',
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '1.5rem',
      boxShadow: '0 2px 4px rgba(124, 58, 237, 0.1)',
      marginLeft: '40px'
    },
    dateInput: {
      width: '90%',
      padding: '0.875rem 1.25rem',
      borderRadius: '8px',
      border: '1.5px solid #D1D5DB',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: '#FAFAFA',
      color: '#111827',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%2399A3AE\' viewBox=\'0 0 24 24\' width=\'24px\' height=\'24px\'%3E%3Cpath d=\'M19,4h-1V2h-2v2H8V2H6v2H5C3.9,4,3,4.9,3,6v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6C21,4.9,20.1,4,19,4z M19,20H5V9h14V20z M7,11h5v5H7V11z\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 1rem center',
      backgroundSize: '1.5rem'
    },
    timeInput: {
      width: '90%',
      padding: '0.875rem 1.25rem',
      borderRadius: '8px',
      border: '1.5px solid #D1D5DB',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: '#FAFAFA',
      color: '#111827',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'%2399A3AE\' viewBox=\'0 0 24 24\' width=\'24px\' height=\'24px\'%3E%3Cpath d=\'M12 7c-.55 0-1 .45-1 1v4h3c.55 0 1-.45 1-1s-.45-1-1-1h-2V8c0-.55-.45-1-1-1z\'/%3E%3Cpath d=\'M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 1rem center',
      backgroundSize: '1.5rem'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentDate = new Date('2024-11-22T18:32:00'); // Example date
const formattedDate = appointmentDate.toISOString();
    const appointmentData = {
      customerId: formData.customerId,
      date: formattedDate,
      email: formData.email,
      contactNo: formData.contactNo
    };

    try {
      const response = await fetch('http://localhost:8080/api/appointments/postAppointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Appointment created:', result);
        
        // Show success alert
        alert('Booking successful! Your appointment has been created.');

        setFormData({
          customerId: '',
          email: '',  
          contactNo: '',
          date: '',
          time: ''
        });
      } else {
        // Show error alert
        alert('Failed to create appointment: ' + response.statusText);
        console.error('Failed to create appointment:', response.statusText);
      }
    } catch (error) {
      // Show error alert
      alert('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
   
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.title}>Book an Appointment</h1>
        
        <form onSubmit={handleSubmit}>
          {['fullName', 'email', 'contactNo'].map((field, index) => (
            <div style={styles.formGroup} key={index}>
              <label style={styles.label}>
                {field === 'fullName' ? 'Full Name' : field === 'email' ? 'Email' : 'Contact No.'}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                placeholder={`Enter ${field === 'fullName' ? 'full name' : field}`}
                value={formData[field]}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          ))}

          <div style={styles.formGroup}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={styles.dateInput}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={styles.timeInput}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
