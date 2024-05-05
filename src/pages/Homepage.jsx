import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Homepage() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Resume Analysis Tool
            </Typography>
            <Typography variant="h5" sx={{ mt: 4 }}>
                Features
            </Typography>
            <Box sx={{ maxWidth: 600, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Resume Query
                </Typography>
                <Typography>
                    The Resume Query feature allows users to upload multiple resumes and submit queries to extract specific information from the uploaded documents. This tool can answer queries such as total job experience in years, skills expertise level, previous job roles, and much more.
                </Typography>
                <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                    Resume JD Comparator
                </Typography>
                <Typography>
                    The Resume JD Comparator feature enables users to upload multiple resumes and a job description (JD) to match the skills listed in the JD against those found in the resumes. This functionality assists recruiters and hiring managers in identifying candidates whose skills align closely with job requirements.
                </Typography>
            </Box>
        </Box>
    );
}
