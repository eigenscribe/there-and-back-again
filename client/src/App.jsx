// Personal Portfolio App - Main component
// This is the main React component that displays the portfolio
import { useState } from 'react'

function App() {
  // State to track if we're using dark (space) or light (wisp) theme
  const [isDarkTheme, setIsDarkTheme] = useState(true)

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'space-bg' : 'wisp-bg'}`}>
      {/* Theme toggle button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="glass p-3 rounded-full text-white hover:scale-105 transition-transform"
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-6 py-12">
        
        {/* Profile Section */}
        <section className="text-center mb-16">
          <div className="glass-dark p-8 rounded-3xl max-w-2xl mx-auto">
            {/* Logo */}
            <img 
              src="/assets/logo1_1757552304373.png" 
              alt="Personal Logo" 
              className="w-24 h-24 mx-auto mb-6"
            />
            
            {/* Name and Title with gradient text */}
            <h1 className="gradient-text text-5xl font-bold mb-4">
              Your Name
            </h1>
            <h2 className="text-custom-cyan text-xl mb-6">
              Software Developer & Creator
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Welcome to my digital space! I'm passionate about creating beautiful, 
              functional applications and exploring the intersection of technology and creativity.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h3 className="gradient-text text-3xl font-bold text-center mb-12">
            Skills & Technologies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {/* Tech Skills (Green bubbles) */}
            {['React', 'Python', 'JavaScript', 'Flask', 'Node.js', 'CSS'].map((skill) => (
              <div
                key={skill}
                className="skill-bubble glass p-6 rounded-full text-center bg-green-500 bg-opacity-20"
                title={skill}
              >
                <div className="text-green-400 font-semibold">{skill}</div>
              </div>
            ))}
            
            {/* STEM Skills (Blue/Purple bubbles) */}
            {['Math', 'Physics', 'Data Science', 'Analytics'].map((skill) => (
              <div
                key={skill}
                className="skill-bubble glass p-6 rounded-full text-center bg-blue-500 bg-opacity-20"
                title={skill}
              >
                <div className="text-custom-blue font-semibold">{skill}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h3 className="gradient-text text-3xl font-bold mb-12">
            Let's Connect
          </h3>
          
          <div className="flex justify-center space-x-8 flex-wrap gap-4">
            {/* Email Link - Red gradient */}
            <a
              href="mailto:your.email@example.com"
              className="glass-dark px-6 py-3 rounded-lg hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(45deg, #ff4757, #ff6b7a)' }}
            >
              <span className="text-white font-semibold">📧 Email</span>
            </a>
            
            {/* GitHub Link - Gray gradient */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark px-6 py-3 rounded-lg hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(45deg, #2c2c54, #40407a)' }}
            >
              <span className="text-white font-semibold">🔗 GitHub</span>
            </a>
            
            {/* LinkedIn Link - Blue gradient */}
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark px-6 py-3 rounded-lg hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(45deg, #0077b5, #00a0dc)' }}
            >
              <span className="text-white font-semibold">💼 LinkedIn</span>
            </a>
            
            {/* Twitter Link - Cyan gradient */}
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-dark px-6 py-3 rounded-lg hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(45deg, #00e8ff, #14b5ff)' }}
            >
              <span className="text-white font-semibold">🐦 Twitter</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
