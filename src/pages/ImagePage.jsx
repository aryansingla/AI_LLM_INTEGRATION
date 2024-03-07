import { useState } from "react";

const ImagePage = () => {
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  // console.log(apiKey)
  // console.log("Hello")
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = output;
    link.download = "generated_image.png";
    link.click();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #9F7AEA, #818CF8, #93C5FD)',
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: '700',
          color: '#2D3748',
          marginBottom: '1rem',
        }}>
          Image <span style={{ color: '#1E40AF' }}>Generation</span>
        </h1>
        <p style={{ color: '#4A5568', marginBottom: '1rem' }}>
          Write a prompt to generate an image
        </p>
        <form
          style={{ marginBottom: '1rem' }}
          className="gen-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="input"
            placeholder="Type your prompt here..."
            style={{
              border: '1px solid #CBD5E0',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              outline: 'none',
              focus: 'border-blue-500',
              width: '100%',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#1E40AF',
              color: '#fff',
              padding: '0.5rem',
              marginTop: '0.5rem',
              borderRadius: '0.25rem',
              width: '100%',
            }}
          >
            Generate
          </button>
        </form>
        <div style={{ marginTop: '1rem' }}>
          {loading && (
            <div
              className="loader ease-linear border rounded-full border-t-4 border-t-blue-500 h-12 w-12"
              style={{
                border: '4px solid #1E40AF',
                borderTop: '4px solid #fff',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          )}
          {!loading && output && (
            <div style={{
              border: '4px solid #1E40AF',
              padding: '0.5rem',
            }}>
              <img
                src={output}
                alt="Generated art"
                style={{
                  borderRadius: '0.25rem',
                  maxWidth: '100%',
                }}
              />
              <button
                onClick={handleDownload}
                style={{
                  background: '#1E40AF',
                  color: '#fff',
                  padding: '0.5rem',
                  marginTop: '0.5rem',
                  borderRadius: '0.25rem',
                  width: '100%',
                }}
              >
                Download Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default ImagePage;
