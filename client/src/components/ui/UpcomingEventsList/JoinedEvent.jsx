import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";

const JoinedEvent = ({
  title,
  courseCode,
  date,
  startTime,
  endTime,
  location,
  createdBy,
  participants,
  _id,
}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          📅 {formatDate(date)}
        </Typography>
        <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Created by
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" component="span">
            {createdBy.displayName}
          </Typography>
          <Typography variant="body2" component="span" color="text.secondary">
            {" "}
            (@{createdBy.userName})
          </Typography>
        </Box>
        <Grid container>
          <Grid
            item
            size={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="body2">📘</Typography>
          </Grid>
          <Grid item size={11}>
            <Typography variant="body2">{courseCode}</Typography>
          </Grid>
          <Grid
            item
            size={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="body2">🕐</Typography>
          </Grid>
          <Grid item size={11}>
            <Typography variant="body2">
              {startTime} - {endTime}
            </Typography>
          </Grid>
          <Grid
            item
            size={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="body2">📍</Typography>
          </Grid>
          <Grid item size={11}>
            <Typography variant="body2">{location}</Typography>
          </Grid>
          <Grid
            item
            size={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="body2">👥</Typography>
          </Grid>
          <Grid item size={11}>
            <Typography variant="body2">{participants.length}</Typography>
          </Grid>
        </Grid>
        
      </CardContent>
      <Box
        sx={{ display: "flex", justifyContent: "center" }}
        onClick={() => navigate(`/session/${_id}`)}
      >
        <CardActions>
          <Button size="small" variant="contained">
            View Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default JoinedEvent;
