import { useEffect, useState } from "react";

export const useFetchWebsiteUsers = (websiteId: string | null) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!websiteId) {
      setError("Website ID is required");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authiq_token="))
          ?.split("=")[1];

        if (!token) throw new Error("No auth token found");

        const res = await fetch(
          `https://authiq.vercel.app/api/external/fetch-all-users?websiteId=${websiteId}`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const json = await res.json();
        setUsers(json.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [websiteId]);

  return { users, loading, error };
};
