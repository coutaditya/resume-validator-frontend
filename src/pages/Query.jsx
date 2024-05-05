import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import MultipleFileUpload from '../components/MultipleFileUpload';

export function Query() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [resumes, setResumes] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false); 
  
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFileChange = (files) => {
    setResumes(files);
  };

  const handleSubmit = async () => {
    setIsLoading(true); 
    const formdata = new FormData();
    formdata.append("query", query);
    resumes.forEach((file) => {
      formdata.append("resume_files", file);
    });

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("https://dssm-project.onrender.com/llm/resume-query-bulk?query_type=without_vectors", requestOptions)
      .then(response => response.json())
      .then(data => {
        setResults(data.results);
        setIsLoading(false); // Set loading to false when the fetch completes
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Ensure loading is set to false if an error occurs
      });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Resume Query
      </Typography>
      <MultipleFileUpload onChange={handleFileChange}/>
      <TextField
        id="query"
        label="Enter Query"
        variant="outlined"
        value={query}
        onChange={handleQueryChange}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Submit
      </Button>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && results.length > 0 && (
        <Box sx={{ mt: 4, width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Results:
          </Typography>
          {results.map((result, index) => (
            <Typography key={index} sx={{ mt: 1 }}>
              <b>{result.filename}:</b><br /> {result.answer}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
