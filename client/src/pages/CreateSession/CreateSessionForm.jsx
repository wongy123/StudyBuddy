import { TextField, Button, Box, Grid, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSidebarRefresh } from "../../context/SidebarRefreshContext";
import { apiBaseUrl } from "../../utils/basePath";

const CreateSessionForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    courseCode: "",
    date: `${format(new Date(), "yyyy-MM-dd")}`,
    startTime: "09:00",
    endTime: "11:00",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");
  const navigate = useNavigate();
  const { triggerRefresh } = useSidebarRefresh();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        triggerRefresh();
        navigate(`/session/${result._id}`);
      } else {
        setSnackMessage(result.message || "Failed to create session.");
        setSnackSeverity("error");
        setSnackOpen(true);
      }
    } catch (err) {
      console.error(err);
      setSnackMessage("Something went wrong.");
      setSnackSeverity("error");
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        multiline
        minRows={3}
        required
        margin="normal"
      />
      <TextField
        label="Course Code"
        name="courseCode"
        value={form.courseCode}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Start Time"
        name="startTime"
        type="time"
        value={form.startTime}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Time"
        name="endTime"
        type="time"
        value={form.endTime}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Creating..." : "Create Session"}
      </Button>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateSessionForm;
