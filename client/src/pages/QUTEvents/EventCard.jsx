import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";

const EventCard = ({ event }) => {
  const { title, date, description, link, where, startTime, endTime, image } =
    event;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100%",
      }}
    >
      {/* Event image */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: { xs: "100%", md: 400 },
            height: { xs: 240, md: "100%" },
            objectFit: "contained",
          }}
        />
      </a>

      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }} // Removes underline
      >
        <Typography variant="h6" color="text.primary">{title}</Typography>
      </a>

        <Typography variant="body2" color="text.secondary">
          {date}{" "}
          {startTime && `• ${startTime}${endTime ? ` - ${endTime}` : ""}`}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {where}
        </Typography>

        <Typography variant="body2" sx={{ my: 1 }}>
          {description}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Button
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="small"
          >
            Learn More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;
