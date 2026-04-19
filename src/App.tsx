import { useState, useEffect } from 'react';

const FAL_KEY = "2a6e6513-1596-4240-b9a7-b9c407e68a87:1479d40ecb99da9d8e75d4bb6e8c0c";

function App() {
  const [prompt, setPrompt] = useState('');
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#000000');
    }
  }, []);

  const generateMeme = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setMemeUrl('');

    try {
      const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${FAL_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          image_size: "landscape_4_3",
          num_inference_steps: 4,
          guidance_scale: 3.5,
          num_images: 1,
          enable_safety_checker: false,
        }),
      });

      const data = await response.json();
      if (data.images && data.images[0]) {
        setMemeUrl(data.images[0].url);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{ marginBottom: '20px' }}>ViralForge</h1>
      
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Digite o prompt do meme..."
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '15px',
          fontSize: '16px',
          borderRadius: '12px',
          border: 'none',
          marginBottom: '20px'
        }}
      />

      <button
        onClick={generateMeme}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          background: '#0088cc',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Gerando...' : 'Gerar Meme'}
      </button>

      {memeUrl && (
        <div style={{ marginTop: '30px', maxWidth: '100%' }}>
          <img src={memeUrl} alt="Meme" style={{ maxWidth: '100%', borderRadius: '12px' }} />
        </div>
      )}
    </div>
  );
}

export default App;