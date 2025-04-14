import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const DisplayNameUserName = ({ userName, displayName, id }) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={{ display: 'inline' }}>
        {displayName}{" "}
      </Typography>
      <Typography variant="body2" color="text.secondary" component={Link} to={`/profile/${id}`} sx={{ display: 'inline' }}>
        (@{userName})
      </Typography>
    </Box>
  );
};

export default DisplayNameUserName;
