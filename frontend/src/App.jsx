import { useRef, useState } from 'react'
import './App.css'

const metrics = [
  { value: '4.9/5', label: 'Average rating' },
  { value: '8k+', label: 'Resumes reviewed' },
  { value: '92%', label: 'ATS match rate' },
]

const scoreBreakdown = [
  { label: 'Experience alignment', value: 91 },
  { label: 'Skill keywords', value: 95 },
  { label: 'Impact statements', value: 88 },
]

const reviewPoints = [
  'ATS formatting & keyword fit',
  'Career-story clarity and role alignment',
  'Quantified wins and stronger positioning',
]

function App() {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('resume.pdf')

  const handleFileSelection = (files) => {
    const selectedFile = files?.[0]
    if (selectedFile) {
      setFileName(selectedFile.name)
    }
  }

  return (
    <div className="page-shell">
      <div className="page-inner">
        <header className="topbar">
          <div className="brand-mark">
            <span>RS</span>
          </div>
          <div className="brand-wordmark">ResumeScore</div>

          <nav className="topnav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#reviews">Reviews</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <button type="button" className="nav-button">
            Get Started
          </button>
        </header>

        <main className="hero-layout">
          <section className="hero-copy">
            <div className="eyebrow">Resume review studio</div>

            <h1>
              Upload your resume and get <span>scored</span>.
            </h1>

            <p className="lede">
              Strategic feedback for the way you tell your story — sharper positioning,
              stronger keywords, and a resume that reads like a confident next step.
            </p>

            <div className="cta-row">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="primary-btn"
              >
                Upload resume
              </button>
              <button type="button" className="secondary-btn">
                Book a review
              </button>
            </div>

            <div className="mini-claims" aria-label="Product trust indicators">
              <span>ATS optimized</span>
              <span>Recruiter-ready wording</span>
              <span>Instant feedback</span>
            </div>

            <div className="stats-row" aria-label="review statistics">
              {metrics.map((item) => (
                <div key={item.label} className="stat-box">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="score-panel" aria-label="Resume score card">
            <div className="panel-header">
              <span>Resume score</span>
              <em>ATS ready</em>
            </div>

            <div className="score-ring-wrap">
              <div
                className="score-ring"
                style={{ background: 'conic-gradient(#b86d3b 0 92%, rgba(27,24,22,0.15) 92% 100%)' }}
              >
                <div className="score-ring-inner">
                  <span>92</span>
                </div>
              </div>
            </div>

            <div className="score-breakdown">
              {scoreBreakdown.map((item) => (
                <div key={item.label} className="bar-item">
                  <div className="bar-meta">
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </main>

        <section className="lower-panel" id="features">
          <div className="upload-box"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              handleFileSelection(event.dataTransfer.files)
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden-input"
              onChange={(event) => handleFileSelection(event.target.files)}
            />

            <div className="upload-icon">↥</div>
            <p className="upload-title">Drop your resume here</p>
            <p className="upload-subtitle">PDF, DOCX, or DOC files accepted</p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="ghost-btn"
            >
              Choose file
            </button>

            <p className="selected-file">Selected file: {fileName}</p>
          </div>

          <div className="review-list">
            <div className="list-header">What gets improved</div>
            <ul>
              {reviewPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
