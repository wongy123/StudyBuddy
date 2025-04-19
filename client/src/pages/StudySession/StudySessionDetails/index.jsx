import { useState } from "react";
import { Paper, Snackbar, Alert } from "@mui/material";
import ViewSession from "./ViewSession";
import EditSessionForm from "./EditSessionForm";

const StudySessionDetails = ({ token, session, onUpdate }) => {
  const [mode, setMode] = useState("view");
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const closeSnack = () =>
    setSnack((prev) => ({
      ...prev,
      open: false,
    }));

  return (
    <>
      <Paper elevation={2} sx={{ p: 3 }}>
        {mode === "edit" ? (
          <EditSessionForm
            session={session}
            token={token}
            onCancel={() => setMode("view")}
            onSuccess={() => {
              setSnack({
                open: true,
                message: "Session updated.",
                severity: "success",
              });
              setMode("view");
              if (onUpdate) onUpdate();
            }}
          />
        ) : (
          <ViewSession
            session={session}
            token={token}
            setMode={setMode}
            onJoinSuccess={onUpdate}
          />
        )}
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnack}
          severity={snack.severity}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default StudySessionDetails;
