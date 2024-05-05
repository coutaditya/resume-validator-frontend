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

export default function SingleFileUpload({ onChange }) {
  const [file, setFile] = React.useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    onChange(selectedFile); 
  };

  const handleRemoveFile = () => {
    setFile(null);
    onChange(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        startIcon={<CloudUploadIcon />}
        disabled={file !== null}
      >
        {file ? 'JD Uploaded' : 'Upload JD'}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      {file && (
        <Typography variant="body1" sx={{ mt: 1 }}>
          {file.name}
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleRemoveFile}
            sx={{ ml: 1 }}
          >
            Remove
          </Button>
        </Typography>
      )}
    </Box>
  );
}
