import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function MultipleFileUpload({ onChange }) {
  const [files, setFiles] = React.useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onChange(newFiles); 
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload Resume
        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
      </Button>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Uploaded Resumes:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 1 }}>
        {files.map((file, index) => (
          <Typography key={index} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
            <span>{file.name}</span>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleRemoveFile(index)}
              sx={{ ml: 1 }}
            >
              Remove
            </Button>
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
