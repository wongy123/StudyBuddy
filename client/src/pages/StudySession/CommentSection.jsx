import { useParams } from "react-router-dom";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { apiBaseUrl } from "../../utils/basePath";

const CommentSection = ({ token }) => {
  const { sessionId } = useParams();
  const [refreshFlag, setRefreshFlag] = useState(false); // for triggering refresh

  const handleSubmit = async (content) => {
    const res = await fetch(`${apiBaseUrl}/api/sessions/${sessionId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to post comment");
    }

    // Toggle refresh flag to notify CommentList to refetch
    setRefreshFlag((prev) => !prev);
  };

  return (
    <>
      <CommentForm onSubmit={handleSubmit} />
      <CommentList key={refreshFlag} token = {token} />
    </>
  );
};

export default CommentSection;
