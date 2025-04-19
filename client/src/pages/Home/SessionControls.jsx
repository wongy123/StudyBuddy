import {
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const SessionControls = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setSortOrder,
  limit,
  setLimit,
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = () => {
    setSearchQuery(localSearch);
  };

  const handleClearSearch = () => {
    setLocalSearch("");
    setSearchQuery("");
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      sx={{ my: 2 }}
      alignItems={{ xs: "end", md: "start" }}
    >
      {/* Row 1: Search, Search Button, Clear */}
      <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
        <TextField
          label="Search (Title, Course, or Creator)"
          variant="outlined"
          size="small"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          sx={{ flexGrow: 1 }}
        />

        <Button variant="contained" onClick={handleSearchSubmit}>
          Search
        </Button>

        {searchQuery && (
          <Button variant="text" color="secondary" onClick={handleClearSearch}>
            Clear
          </Button>
        )}
      </Stack>

      {/* Row 2: Sort & Per Page dropdowns */}
      <Stack direction="row" spacing={2}>
        <FormControl size="small">
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOrder}
            label="Sort"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <MenuItem value="asc">Soonest</MenuItem>
            <MenuItem value="desc">Latest</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Per Page</InputLabel>
          <Select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            label="per-page"
          >
            {[3, 5, 10, 20].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default SessionControls;
