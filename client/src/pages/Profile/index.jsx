import { useParams } from 'react-router-dom'
import { useEffect , useState } from 'react'

const ProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
  
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        const result = await res.json();
  
        if (res.ok) {
          setUser(result.data);
        } else {
          console.error(result.message || 'Failed to fetch user');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, [id]);
  
    if (!user) return <div>Loading...</div>;
  
    return <div>{user.displayName}</div>;
  };
  
  export default ProfilePage;