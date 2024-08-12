import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';

const UploadNotice = () => {
  const [date, setDate] = useState(new Date());
  const [noticeContent, setNoticeContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const notice = {
      date,
      content: noticeContent,
    };
    // Add your logic to save the notice here
    console.log(notice);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Upload Notice
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
              fullWidth
              format="MM/dd/yyyy"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notice Content"
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              multiline
              rows={6}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Notice
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UploadNotice;
