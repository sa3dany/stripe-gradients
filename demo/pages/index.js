import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { WaveGradient } from "wave-gradients";
import Controls from "../components/controls";
import { GithubIcon } from "../components/icons";

// ---------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------

function Layout({ children }) {
  return <div className="relative mx-auto h-full px-5">{children}</div>;
}

// ---------------------------------------------------------------------
// Page components
// ---------------------------------------------------------------------

function Layout({ children }) {
  return (
    <div className="relative mx-auto h-full px-5">
      <Head>
        <title>Wave Gradients</title>
      </Head>

      {/* Navigation */}
      <nav className="container relative z-10 mx-auto flex items-center justify-between pt-5 text-white mix-blend-overlay">
        {/* Logo */}
        <header className="select-none">
          <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-wider lg:text-4xl">
            Wave Gradients
          </h1>
        </header>
        {/* Github repo link */}
        <a href="https://github.com/sa3dany/wave-gradients">
          <span className="sr-only">GitHub repo</span>
          <GithubIcon className="h-8 w-8 lg:h-10 lg:w-10" />
        </a>
      </nav>

      {/* Page */}
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------

export default function DemoPaage() {
  const [gradient, setGradient] = useState();
  const [time, setTime] = useState(Math.random() * 1000 * 60 * 60);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wireframe, setWireframe] = useState(false);

  const canvas = useRef();

  /**
   * Load the wave gradient library
   */
  useEffect(() => {
  }, []);

  /**
   * Initialize the gradient
   */
  useEffect(() => {
    if (false) {
      return;
    }

    // Get rid of a three.js warning due to HMR during development
    if (process.env.NODE_ENV === "development") {
      delete window.__THREE__;
    }

    const gradient = new WaveGradient(canvas.current, {
      colors: ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"],
      density: [0.048, 0.12],
      time,
      wireframe,
    });

    setGradient(gradient);
    isPlaying && gradient.play();

    function resizeGradient() {
      gradient.resize();
    }
    window.addEventListener("resize", resizeGradient);

    return () => {
      window.removeEventListener("resize", resizeGradient);
      gradient.dispose();
    };
  }, [canvas, time, wireframe, isPlaying]);

  return (
    <Layout>
      <div className="absolute inset-0 overflow-hidden">
        <canvas ref={canvas} />
      </div>

      <div className="isolate items-end justify-between space-y-6 mix-blend-normal sm:flex sm:h-24 sm:space-y-0">
        <PageHeader>
          Wave Gradients
          <Head>
            <title>Wave Gradients</title>
          </Head>
        </PageHeader>

        <Controls
          useWireframe={() => [
            wireframe,
            () => {
              setWireframe(!wireframe);
              setTime(gradient.time);
            },
          ]}
          usePlay={() => [
            isPlaying,
            () => {
              setIsPlaying(!isPlaying);
              setTime(gradient.time);
            },
          ]}
        />
      </div>
    </Layout>
  );
}
