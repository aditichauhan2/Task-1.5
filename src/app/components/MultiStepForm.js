"use client";
import { useState } from "react";
import styles from "@/app/styles/MultiStepForm.module.css"; 

export default function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [location, setLocation] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const submitForm = () => {
        if (validateStep()) {
            const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
            const newJob = { location, jobTitle, name, phone };
            localStorage.setItem("appliedJobs", JSON.stringify([...appliedJobs, newJob]));
            setSubmitted(true);
        }
    };  

    const validateStep = () => {
        let newErrors = {};

        if (step === 1 && !location.trim()) newErrors.location = "Location is required";
        if (step === 2 && !jobTitle.trim()) newErrors.jobTitle = "Job Title is required";

        if (step === 3) {
            if (!name.trim()) newErrors.name = "Name is required";

            if (!phone.trim()) {
                newErrors.phone = "Phone number is required";  
            } else if (!/^\d{10}$/.test(phone)) {
                newErrors.phone = "Phone number must be 10 digits";  
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    if (submitted) {
        return (
            <div className={styles.formContainer}>
                <h2 className={styles.successMessage}>Successfully Received Application</h2>
                <h5 style={{ color: '#9754db', fontSize: '15px' }}>We will reach out to you soon.</h5>
                <button className={styles.startOverButton} onClick={() => {
                    setStep(1);
                    setLocation("");
                    setJobTitle("");
                    setName("");
                    setPhone("");
                    setErrors({});
                    setSubmitted(false);
                }}>
                    Start Over
                </button>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            {/* Progress Bar */}
            <div className={styles.progressBar}>
                {[1, 2, 3].map((num) => (
                    <div key={num} className={`${styles.step} ${step > num ? styles.completedStep : ""} ${step === num ? styles.activeStep : ""}`}>
                        <div className={styles.stepCircle}>{step > num ? "✔" : num}</div>
                        <span className={styles.stepLabel}>Step {num}</span>
                    </div>
                ))}
            </div>

            {/* Dynamic Step Titles */}
            <h2>
                {step === 1 && "Location"}
                {step === 2 && "Job Title"}
                {step === 3 && "Personal Details"}
            </h2>

            {step === 1 && (
                <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>Location</label>
                    <input
                        type="text"
                        placeholder="Enter Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`${styles.inputField} ${errors.location ? styles.inputError : ""}`}
                    />
                    {errors.location && <p className={styles.errorText}>{errors.location}</p>}
                </div>
            )}

            {step === 2 && (
                <div className={styles.formGroup}>
                    <label className={styles.fieldLabel}>Job Title</label>
                    <input
                        type="text"
                        placeholder="Enter Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className={`${styles.inputField} ${errors.jobTitle ? styles.inputError : ""}`}
                    />
                    {errors.jobTitle && <p className={styles.errorText}>{errors.jobTitle}</p>}
                </div>
            )}

            {step === 3 && (
                <div className={styles.formGroup}>
                    {/* Previously entered Location and Job Title */}
                    <label className={styles.fieldLabel}>Location</label>
                    <input type="text" value={location} readOnly className={styles.readOnlyField} />

                    <label className={styles.fieldLabel}>Job Title</label>
                    <input type="text" value={jobTitle} readOnly className={styles.readOnlyField} />

                    {/* Name and Phone Inputs */}
                    <label className={styles.fieldLabel}>Name</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`${styles.inputField} ${errors.name ? styles.inputError : ""}`}
                    />
                    {errors.name && <p className={styles.errorText}>{errors.name}</p>}

                    <label className={styles.fieldLabel}>Phone Number</label>
                    <input
                        type="text"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`${styles.inputField} ${errors.phone ? styles.inputError : ""}`}
                    />
                    {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}

                    <label className={styles.fieldLabel}>Upload Certification (Optional)</label>
                    <input type="file" className={styles.inputField} />
                </div>
            )}

            <div className={styles.buttonGroup}>
                {step > 1 && <button className={styles.backButton} onClick={handleBack}>⬅ Back</button>}
                {step < 3 ? (
                    <button className={styles.nextButton} onClick={handleNext}>Next ➡</button>
                ) : (
                    <button className={styles.submitButton} onClick={submitForm}>Submit</button>
                )}
            </div>
        </div>
    );
}
