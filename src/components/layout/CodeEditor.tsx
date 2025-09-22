'use client'

interface CodeEditorProps {
  code: string
}

export default function CodeEditor({ code }: CodeEditorProps) {
  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <div className="file-tab">
          <div className="file-icon">📄</div>
          <span className="file-name">main.dart</span>
        </div>
        <div className="editor-controls">
          {/* <div className="line-numbers-toggle">
            <span>Line Numbers</span>
          </div> */}
        </div>
      </div>
      
      <div className="code-editor">
        <div className="line-numbers">
          {code.split('\n').map((_, index) => (
            <div key={index} className="line-number">
              {index + 1}
            </div>
          ))}
        </div>
        
        <div className="code-content">
          <pre className="code-block">
            <code className="dart-code">{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
