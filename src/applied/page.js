"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/AppliedJobs.module.css";

export default function AppliedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
        setAppliedJobs(storedJobs);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Applied Jobs</h1>
            {appliedJobs.length === 0 ? (
                <p className={styles.noJobs}>No jobs applied yet.</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Job Title</th>
                            <th>Name</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedJobs.map((job, index) => (
                            <tr key={index}>
                                <td>{job.location}</td>
                                <td>{job.jobTitle}</td>
                                <td>{job.name}</td>
                                <td>{job.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
