export function DocumentViewer({ documents }: { documents: Array<{ name: string; url: string }> }) {
  if (!documents.length) return <p className="muted">No documents attached.</p>;
  return <ul className="document-list">{documents.map((document) => (
    <li key={document.url}><a href={document.url} target="_blank" rel="noreferrer">{document.name}</a></li>
  ))}</ul>;
}