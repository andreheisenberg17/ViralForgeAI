import { useState, useEffect } from 'react';

const FAL_KEY = "2a6e6513-1596-4240-b9a7-b9c407e68a87:1479d40ecb99da9d8e75d4bb6e8c0c3c";

function App() {
  const [prompt, setPrompt] = useState('');
  const [memeUrl, setMemeUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Inicializa o Telegram Mini App
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
          "Authorization": `Key ${FAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt + ", meme style, funny, viral, internet meme",
          image_size: "landscape",
          num_inference_steps: 4,
          guidance_scale: 3.5,
        }),
      });

      const data = await response.json();
      setMemeUrl(data.images[0].url);
    } catch (error) {
      console.error(error);
      const randomId = Math.floor(Math.random() * 900) + 100;
      setMemeUrl(`https://picsum.photos/id/${randomId}/600/600`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000000', color: '#ffffff', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#facc15' }}>ViralForge</h1>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>AI Meme Arena</div>
        </div>

        <textarea
          style={{
            width: '100%',
            height: '140px',
            backgroundColor: '#18181b',
            border: '2px solid #3f3f46',
            borderRadius: '16px',
            padding: '16px',
            color: '#fff',
            fontSize: '16px',
            resize: 'none',
            marginBottom: '20px'
          }}
          placeholder="Descreva o meme que você quer criar... (ex: Elon Musk dancing with a cat in cyberpunk Tokyo)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateMeme}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#facc15',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '18px',
            padding: '18px',
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Gerando meme com IA...' : '✨ Gerar Meme'}
        </button>

        {memeUrl && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Seu Meme Gerado</h2>
            <img src={memeUrl} alt="Meme" style={{ width: '100%', borderRadius: '24px', border: '3px solid #3f3f46' }} />
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button style={{ flex: 1, backgroundColor: '#27272a', padding: '14px', borderRadius: '16px', fontWeight: '500' }}>Batalhar na Arena</button>
              <button style={{ flex: 1, backgroundColor: '#22c55e', padding: '14px', borderRadius: '16px', fontWeight: '500' }}>Mintar como Gift NFT</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;