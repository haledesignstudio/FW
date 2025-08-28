"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

type Doc = Record<string, unknown>;

type MessageData = {
  type: string;
  slug: string;
};

export default function PreviewReceiver() {
  const [doc, setDoc] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.data || typeof event.data !== "object") return;

      const { type, slug } = event.data as MessageData;
      if (!type || !slug) return;

      setLoading(true);
      client
        .fetch(`*[_type == $type && slug.current == $slug][0]`, { type, slug })
        .then((result) => {
          setDoc(result);
        })
        .catch((error) => {
          console.error("Error fetching preview data:", error);
          setDoc(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>Preview Receiver</h3>
      {loading && <p>Loading...</p>}
      {!loading && !doc && <p>No data found.</p>}
      {!loading && doc && (
        <pre style={{ whiteSpace: "pre-wrap", maxHeight: "60vh", overflow: "auto" }}>
          {JSON.stringify(doc, null, 2)}
        </pre>
      )}
    </div>
  );
}
