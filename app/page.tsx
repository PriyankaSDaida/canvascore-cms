"use client";

import { useMemo, useState } from "react";

type Status = "Draft" | "In review" | "Approved" | "Published";
type Role = "Editor" | "Reviewer" | "Admin";
type Block = { id: number; type: string; title: string; body: string };

const entries = [
  {
    title: "Future of sustainable travel",
    type: "Landing page",
    status: "In review" as Status,
    author: "Priya Sharma",
    updated: "2 min ago",
  },
  {
    title: "Spring destinations campaign",
    type: "Campaign",
    status: "Draft" as Status,
    author: "Marcus Lee",
    updated: "18 min ago",
  },
  {
    title: "Member rewards overview",
    type: "Landing page",
    status: "Published" as Status,
    author: "Priya Sharma",
    updated: "Yesterday",
  },
  {
    title: "Lisbon city guide",
    type: "Article",
    status: "Approved" as Status,
    author: "Noah Williams",
    updated: "Yesterday",
  },
];

const starterBlocks: Block[] = [
  {
    id: 1,
    type: "Hero",
    title: "Travel lighter. Go further.",
    body: "Thoughtful journeys designed for a changing world.",
  },
  {
    id: 2,
    type: "Rich text",
    title: "A better way to explore",
    body: "We partner with local communities and responsible operators to make every journey matter.",
  },
  {
    id: 3,
    type: "Feature grid",
    title: "Why travel with us",
    body: "Lower impact · Local expertise · Flexible booking",
  },
  {
    id: 4,
    type: "Call to action",
    title: "Start planning",
    body: "Explore sustainable escapes",
  },
];

const versions = [
  {
    version: "v4.0",
    by: "Priya Sharma",
    when: "Today, 10:42 AM",
    note: "Updated hero and SEO",
  },
  {
    version: "v3.1",
    by: "Marcus Lee",
    when: "Yesterday, 3:18 PM",
    note: "Reviewed destination copy",
  },
  {
    version: "v3.0",
    by: "Priya Sharma",
    when: "May 14, 11:07 AM",
    note: "Added feature grid",
  },
];

export default function Home() {
  const [view, setView] = useState<"editor" | "content" | "models" | "team">(
    "editor",
  );
  const [blocks, setBlocks] = useState(starterBlocks);
  const [selected, setSelected] = useState(1);
  const [status, setStatus] = useState<Status>("In review");
  const [role, setRole] = useState<Role>("Admin");
  const [preview, setPreview] = useState(true);
  const [history, setHistory] = useState(false);
  const [saved, setSaved] = useState(true);
  const [toast, setToast] = useState("");
  const selectedBlock = blocks.find((block) => block.id === selected)!;
  const permissions = useMemo(
    () => ({
      canEdit: role !== "Reviewer",
      canPublish: role === "Admin",
      canApprove: role !== "Editor",
    }),
    [role],
  );

  function updateBlock(field: "title" | "body", value: string) {
    setBlocks((current) =>
      current.map((block) =>
        block.id === selected ? { ...block, [field]: value } : block,
      ),
    );
    setSaved(false);
  }
  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }
  function save() {
    setSaved(true);
    notify("Changes saved as a new version");
  }
  function advance() {
    if (status === "In review" && permissions.canApprove) {
      setStatus("Approved");
      notify("Entry approved");
    } else if (status === "Approved" && permissions.canPublish) {
      setStatus("Published");
      notify("Entry published to Production");
    } else notify("Your role does not allow this action");
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#workspace">
        Skip to workspace
      </a>
      <aside className="rail" aria-label="Primary navigation">
        <button className="brand" aria-label="CanvasCore home">
          <span className="brand-mark">C</span>
        </button>
        <nav>
          <button
            className={view === "content" ? "active" : ""}
            onClick={() => setView("content")}
          >
            <span>▤</span>
            <small>Content</small>
          </button>
          <button
            className={view === "models" ? "active" : ""}
            onClick={() => setView("models")}
          >
            <span>◇</span>
            <small>Models</small>
          </button>
          <button
            className={view === "editor" ? "active" : ""}
            onClick={() => setView("editor")}
          >
            <span>✦</span>
            <small>Editor</small>
          </button>
          <button>
            <span>▧</span>
            <small>Media</small>
          </button>
          <button
            className={view === "team" ? "active" : ""}
            onClick={() => setView("team")}
          >
            <span>◎</span>
            <small>Team</small>
          </button>
        </nav>
        <div className="rail-bottom">
          <button>
            <span>?</span>
            <small>Help</small>
          </button>
          <div className="avatar">PS</div>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div>
            <b className="wordmark">CanvasCore</b>
            <span className="workspace-name">/ Atlas Travel</span>
          </div>
          <div className="top-actions">
            <label className="role-select">
              View as{" "}
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option>Editor</option>
                <option>Reviewer</option>
                <option>Admin</option>
              </select>
            </label>
            <button className="icon-button" aria-label="Search">
              ⌕
            </button>
            <button className="icon-button" aria-label="Notifications">
              ○<i />
            </button>
          </div>
        </header>
        {view === "editor" && (
          <main id="workspace" className="workspace">
            <div className="entrybar">
              <div>
                <div className="breadcrumbs">
                  Content <span>/</span> Landing pages <span>/</span>
                </div>
                <h1>Future of sustainable travel</h1>
                <div className="entry-meta">
                  <span
                    className={`status ${status.toLowerCase().replace(" ", "-")}`}
                  >
                    {status}
                  </span>
                  <span>{saved ? "Saved" : "Unsaved changes"}</span>
                  <span>•</span>
                  <span>English (US)</span>
                </div>
              </div>
              <div className="entry-actions">
                <button
                  className="secondary"
                  onClick={() => setHistory(!history)}
                >
                  ↶ Version history
                </button>
                <button
                  className="secondary"
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? "Hide" : "Show"} preview
                </button>
                <button
                  className="secondary"
                  disabled={saved || !permissions.canEdit}
                  onClick={save}
                >
                  Save draft
                </button>
                <button className="primary" onClick={advance}>
                  {status === "Approved" ? "Publish" : "Approve"} <span>→</span>
                </button>
              </div>
            </div>
            <div className={`editor-grid ${preview ? "" : "no-preview"}`}>
              <section className="blocks-panel" aria-label="Page structure">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">PAGE STRUCTURE</span>
                    <h2>Content blocks</h2>
                  </div>
                  <button
                    disabled={!permissions.canEdit}
                    onClick={() => {
                      const id = Date.now();
                      setBlocks([
                        ...blocks,
                        {
                          id,
                          type: "Rich text",
                          title: "Untitled block",
                          body: "Add your content here.",
                        },
                      ]);
                      setSelected(id);
                    }}
                  >
                    ＋ Add block
                  </button>
                </div>
                <div className="block-list">
                  {blocks.map((block, index) => (
                    <button
                      key={block.id}
                      className={`block-card ${selected === block.id ? "selected" : ""}`}
                      onClick={() => setSelected(block.id)}
                    >
                      <span className="drag">⠿</span>
                      <span className="block-index">0{index + 1}</span>
                      <span className="block-copy">
                        <small>{block.type}</small>
                        <b>{block.title}</b>
                      </span>
                      <span className="more">•••</span>
                    </button>
                  ))}
                </div>
                <div className="schema-note">
                  <span>⌘</span>
                  <div>
                    <b>Schema-powered</b>
                    <p>
                      Blocks validate against the Landing Page content model.
                    </p>
                  </div>
                  <button onClick={() => setView("models")}>View model</button>
                </div>
              </section>
              <section
                className="form-panel"
                aria-labelledby="properties-title"
              >
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">BLOCK PROPERTIES</span>
                    <h2 id="properties-title">{selectedBlock.type}</h2>
                  </div>
                  <span className="required-note">
                    <i /> Required fields
                  </span>
                </div>
                <fieldset disabled={!permissions.canEdit}>
                  <label>
                    Internal name <span>Required</span>
                    <input
                      value={selectedBlock.title}
                      onChange={(e) => updateBlock("title", e.target.value)}
                    />
                  </label>
                  <label>
                    Supporting copy <span>Required</span>
                    <textarea
                      value={selectedBlock.body}
                      onChange={(e) => updateBlock("body", e.target.value)}
                      rows={4}
                    />
                  </label>
                  <label>
                    Audience segment
                    <select>
                      <option>All travelers</option>
                      <option>Members</option>
                      <option>New visitors</option>
                    </select>
                  </label>
                  <div className="field-row">
                    <label>
                      Theme
                      <select>
                        <option>Warm editorial</option>
                        <option>Dark immersive</option>
                        <option>Minimal</option>
                      </select>
                    </label>
                    <label>
                      Alignment
                      <select>
                        <option>Left</option>
                        <option>Center</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    SEO description{" "}
                    <small>{selectedBlock.body.length}/160</small>
                    <textarea
                      defaultValue="Discover thoughtful journeys designed for a changing world."
                      rows={3}
                    />
                  </label>
                </fieldset>
                {!permissions.canEdit && (
                  <div className="permission-banner">
                    Reviewer access is read-only. Switch roles to edit content.
                  </div>
                )}
              </section>
              {preview && (
                <aside className="preview-panel" aria-label="Live preview">
                  <div className="preview-toolbar">
                    <span>
                      <i className="live-dot" /> LIVE PREVIEW
                    </span>
                    <div>
                      <button aria-label="Desktop preview">▱</button>
                      <button aria-label="Mobile preview">▯</button>
                      <button aria-label="Open preview">↗</button>
                    </div>
                  </div>
                  <div className="browser-frame">
                    <div className="browser-bar">
                      <span />
                      <span />
                      <span />
                      <div>atlastravel.com/future-travel</div>
                    </div>
                    <div className="site-preview">
                      <div className="preview-nav">
                        <b>ATLAS</b>
                        <span>
                          Destinations&nbsp;&nbsp;&nbsp;
                          Experiences&nbsp;&nbsp;&nbsp; Impact
                        </span>
                        <button>Plan a trip</button>
                      </div>
                      {blocks.map((block, index) => (
                        <section
                          key={block.id}
                          className={`preview-block preview-${index}`}
                        >
                          <small>{block.type}</small>
                          <h3>{block.title}</h3>
                          <p>{block.body}</p>
                          {index === 0 && <button>Explore journeys →</button>}
                        </section>
                      ))}
                    </div>
                  </div>
                  <p className="preview-foot">
                    Previewing <b>Development</b> · Updates instantly
                  </p>
                </aside>
              )}
            </div>
            {history && (
              <aside className="history-drawer">
                <div className="drawer-head">
                  <div>
                    <span className="eyebrow">AUDIT TRAIL</span>
                    <h2>Version history</h2>
                  </div>
                  <button onClick={() => setHistory(false)}>×</button>
                </div>
                {versions.map((version, i) => (
                  <div className="version" key={version.version}>
                    <span className="version-dot">{i === 0 ? "✓" : ""}</span>
                    <div>
                      <b>
                        {version.version} {i === 0 && <em>Current</em>}
                      </b>
                      <p>{version.note}</p>
                      <small>
                        {version.by} · {version.when}
                      </small>
                    </div>
                    {i > 0 && (
                      <button
                        onClick={() =>
                          notify(`${version.version} restored as a new draft`)
                        }
                      >
                        Restore
                      </button>
                    )}
                  </div>
                ))}
              </aside>
            )}
          </main>
        )}
        {view === "content" && <ContentView onOpen={() => setView("editor")} />}
        {view === "models" && <ModelsView />}
        {view === "team" && <TeamView />}
      </div>
      {toast && (
        <div role="status" className="toast">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

function ContentView({ onOpen }: { onOpen: () => void }) {
  return (
    <main id="workspace" className="library">
      <div className="page-head">
        <div>
          <span className="eyebrow">CONTENT OPERATIONS</span>
          <h1>All content</h1>
          <p>Manage entries across channels, locales, and workflows.</p>
        </div>
        <button className="primary">＋ New entry</button>
      </div>
      <div className="metrics">
        <div>
          <small>Total entries</small>
          <b>248</b>
          <span>+14 this month</span>
        </div>
        <div>
          <small>In review</small>
          <b>12</b>
          <span>Needs attention</span>
        </div>
        <div>
          <small>Scheduled</small>
          <b>8</b>
          <span>Next: 9:00 AM</span>
        </div>
        <div>
          <small>Published</small>
          <b>184</b>
          <span>74% of content</span>
        </div>
      </div>
      <div className="table-card">
        <div className="table-tools">
          <input placeholder="Search content…" aria-label="Search content" />
          <select>
            <option>All models</option>
            <option>Landing page</option>
            <option>Article</option>
          </select>
          <select>
            <option>All statuses</option>
            <option>Draft</option>
            <option>In review</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content model</th>
              <th>Status</th>
              <th>Author</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.title} onClick={onOpen} tabIndex={0}>
                <td>
                  <b>{entry.title}</b>
                  <small>
                    /en-US/{entry.title.toLowerCase().replaceAll(" ", "-")}
                  </small>
                </td>
                <td>{entry.type}</td>
                <td>
                  <span
                    className={`status ${entry.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {entry.status}
                  </span>
                </td>
                <td>{entry.author}</td>
                <td>{entry.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
function ModelsView() {
  return (
    <main id="workspace" className="library">
      <div className="page-head">
        <div>
          <span className="eyebrow">SCHEMA STUDIO</span>
          <h1>Content models</h1>
          <p>Define reusable, validated structures for every channel.</p>
        </div>
        <button className="primary">＋ New model</button>
      </div>
      <div className="model-grid">
        {[
          ["Landing page", "12 fields", "84 entries"],
          ["Article", "9 fields", "126 entries"],
          ["Campaign", "14 fields", "18 entries"],
          ["Navigation", "6 fields", "4 entries"],
        ].map((m, i) => (
          <article key={m[0]}>
            <span className="model-icon">{["▤", "¶", "✦", "☷"][i]}</span>
            <div>
              <h2>{m[0]}</h2>
              <p>
                {m[1]} · {m[2]}
              </p>
            </div>
            <button>•••</button>
            <div className="schema-code">
              <code>{`{ type: "${m[0].toLowerCase().replace(" ", "_")}", required: true }`}</code>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
function TeamView() {
  return (
    <main id="workspace" className="library">
      <div className="page-head">
        <div>
          <span className="eyebrow">ACCESS CONTROL</span>
          <h1>People & permissions</h1>
          <p>Manage workspace roles with least-privilege access.</p>
        </div>
        <button className="primary">＋ Invite member</button>
      </div>
      <div className="permission-card">
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Approve</th>
              <th>Publish</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Priya Sharma", "Admin", "✓", "✓", "✓"],
              ["Marcus Lee", "Editor", "✓", "—", "—"],
              ["Noah Williams", "Reviewer", "—", "✓", "—"],
            ].map((r) => (
              <tr key={r[0]}>
                <td>
                  <b>{r[0]}</b>
                </td>
                {r.slice(1).map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
