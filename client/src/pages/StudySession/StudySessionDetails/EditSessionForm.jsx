import { Box, Button, TextField, Grid, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { apiBaseUrl } from "../../../utils/basePath";

const EditSessionForm = ({ session, token, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: session.title || "",
    description: session.description || "",
    courseCode: session.courseCode || "",
    date: session.date ? session.date.slice(0, 10) : "",
    startTime: session.startTime || "",
    endTime: session.endTime || "",
    location: session.location || "",
  });

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiBaseUrl}/api/sessions/${session._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setSnack({
          open: true,
          message: "Session updated.",
          severity: "success",
        });
        if (onSuccess) onSuccess();
      } else {
        setSnack({
          open: true,
          message: result.message || "Update failed.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setSnack({
        open: true,
        message: "An error occurred.",
        severity: "error",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ "& > *": { my: 1 } }}>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          required
          fullWidth
        />
        <TextField
          name="courseCode"
          label="Course Code"
          value={formData.courseCode}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
        <TextField
          name="startTime"
          label="Start Time"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
        <TextField
          name="endTime"
          label="End Time"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 1 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditSessionForm;
