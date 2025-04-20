import { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import DisplayNameUserName from "../../components/common/DisplayNameUserName";
import { useUser } from "../../hooks/useUser";
import OptionsMenu from "../../components/common/OptionsMenu";

const CommentCard = ({ user, createdAt, content, onDelete, onUpdate }) => {
  const { user: currentUser } = useUser();
  const isOwner = currentUser?.id === user._id;
  const isModmin =
    currentUser?.role === "admin" || currentUser?.role === "moderator";

  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    if (onUpdate) onUpdate(editedContent);
    setEditing(false);
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <DisplayNameUserName
          displayName={user.displayName}
          userName={user.userName}
          id={user._id}
        />

        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </Typography>

          {(isOwner || isModmin) && (
            <OptionsMenu onEdit={() => setEditing(true)} onDelete={onDelete} />
          )}
        </Box>
      </Box>

      {editing ? (
        <Box>
          <TextField
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            multiline
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            inputProps={{ maxLength: 500 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {editedContent.length > 0 && (
                    <Box mr={1} textAlign="right">
                      <small
                        style={{
                          color:
                            editedContent.length >= 500 ? "red" : "inherit",
                        }}
                      >
                        {editedContent.length} / 500
                      </small>
                    </Box>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setEditedContent(content);
                setEditing(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body1">{content}</Typography>
      )}
    </Paper>
  );
};

export default CommentCard;
