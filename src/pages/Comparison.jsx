import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MultipleFileUpload from '../components/MultipleFileUpload';
import InputFileUpload from '../components/SingleFileUpload';
import CircularProgress from '@mui/material/CircularProgress';

export function Comparison() {
  const [resumes, setResumes] = React.useState([]);
  const [jdFile, setJdFile] = React.useState(null);
  const [jdString, setJdString] = React.useState('');
  const [results, setResults] = React.useState(null);  // Store the entire response here
  const [isLoading, setIsLoading] = React.useState(false);

  const handleResumeChange = (files) => {
    setResumes(files);
  };

  const handleJdFileChange = (file) => {
    setJdFile(file);
  };

  const handleJdStringChange = (event) => {
    setJdString(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formdata = new FormData();
    resumes.forEach((file) => {
      formdata.append("resume_files", file);
    });

    if (jdFile) {
      formdata.append('job_description_file', jdFile);
    } else {
      formdata.append('job_description_string', jdString);
    }

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    const endpoint = jdFile ? "https://dssm-project.onrender.com/llm/match/resume-jd-file" : "https://dssm-project.onrender.com/llm/match/resume-jd-str";

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => {
        setResults(data.data); // Assuming the response structure matches your JSON example
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Resume JD Comparison
      </Typography>
      <MultipleFileUpload onChange={handleResumeChange} />
      {(!jdFile && jdString.length === 0) && <InputFileUpload onChange={handleJdFileChange} />}
      {(!jdFile) && <TextField
        id="jd-string"
        label="or enter JD as String here"
        variant="outlined"
        value={jdString}
        onChange={handleJdStringChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mt: 2 }}
      />}
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {results && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Job Description Skills:</Typography>
          <Typography>{results.job_description.filename}</Typography>
          {results.job_description.skills.map((skill, index) => (
            <Typography key={index}>{skill}</Typography>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>Resumes:</Typography>
          {results.resumes.map((resume, index) => (
            <Box key={index} sx={{ mt: 1 }}>
              <Typography>{resume.resume_name}</Typography>
              <Typography>Skills Matched: {resume.skills_matched}%</Typography>
              <Typography>Skill Details: {resume.skill_details.skills.join(', ')}</Typography>
              <Typography>Matching Skills: {resume.skill_details.matching_skills.join(', ')}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
