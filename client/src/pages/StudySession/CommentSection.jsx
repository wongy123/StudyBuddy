import { useParams } from "react-router-dom";
import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = () => {
  const { sessionId } = useParams();
  const [refreshFlag, setRefreshFlag] = useState(false); // for triggering refresh

  const handleSubmit = async (content) => {
    const res = await fetch(`/api/sessions/${sessionId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      <CommentList key={refreshFlag} />
    </>
  );
};

export default CommentSection;
