// src/components/ModuleRating.jsx
// Thumbs up / down widget — render after every completed module.
// Thumbs down asks for optional free text; rating <= 2 auto-alerts the Director.
import { useState } from 'react'
import { emitModuleRated } from '../lib/lmsEvents'

export default function ModuleRating({ moduleId, studentId }) {
  const [selected, setSelected] = useState(null) // 1 = down, 5 = up
  const [freeText, setFreeText] = useState('')
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = async () => {
    setBusy(true)
    try {
      await emitModuleRated({ studentId, moduleId, rating: selected, freeText })
      setSubmitted(true)
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (submitted) {
    return <p className="rating-done">Thanks! Your feedback is in — the Director sees low ratings immediately.</p>
  }

  return (
    <div className="module-rating card">
      <p>How was this module?</p>
      <div className="thumbs">
        <button
          type="button"
          className={selected === 1 ? 'thumbs-btn selected-down' : 'thumbs-btn'}
          onClick={() => setSelected(1)}
          aria-label="Thumbs down"
        >
          👎 Not for me
        </button>
        <button
          type="button"
          className={selected === 5 ? 'thumbs-btn selected-up' : 'thumbs-btn'}
          onClick={() => setSelected(5)}
          aria-label="Thumbs up"
        >
          👍 Loved it
        </button>
      </div>
      {selected === 1 && (
        <textarea
          value={freeText}
          onChange={(e) => setFreeText(e.target.value)}
          placeholder="What could be better? (optional)"
          rows={2}
        />
      )}
      <button
        type="button"
        onClick={submit}
        disabled={selected === null || busy}
        className="btn-primary"
      >
        {busy ? 'Sending…' : 'Send feedback'}
      </button>
    </div>
  )
}
