import React, { useRef, useEffect } from 'react';
import { useDocumentValues } from 'sanity';

export default function PresentationIframe({ documentId }: { documentId: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { value: document } = useDocumentValues(documentId, ['_type', 'slug']);

  useEffect(() => {
    if (!iframeRef.current || !document) return;

    const { _type, slug } = document as { _type: string; slug?: { current: string } };
    if (!_type || !slug?.current) return;

    iframeRef.current.contentWindow?.postMessage(
      { type: _type, slug: slug.current },
      '*'
    );
  }, [document]);

  return (
    <iframe
      ref={iframeRef}
      src="/preview-receiver"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  );
}
