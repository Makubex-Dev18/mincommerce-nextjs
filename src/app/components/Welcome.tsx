import React from "react";
import { ShoppingBag, Tag, Sparkles } from "lucide-react";


  const cardClasses = ` transition-all duration-300  hover:border-primary-500 hover:shadow-neon-sm  relative  flex flex-col  cursor-pointer`;

  const cardFirst =`bg-bg-card text-text-primary py-16 px-6 text-center border border-border-default rounded-lg shadow-sm max-w-4xl mx-auto mt-10`;

const Welcome: React.FC = () => {
  return (
    <section className={`${cardFirst} ${cardClasses}`}>
      <div className="flex justify-center mb-4">
        <Sparkles size={40} className="text-primary-400 animate-pulse" />
      </div>

      <h1 className="text-4xl font-extrabold mb-4">
        ¡Bienvenido a <span className="text-primary-500">MinCommerce</span>!
      </h1>

      <p className="text-lg max-w-2xl mx-auto mb-8 text-text-secondary">
        Tu tienda online de confianza 💛 donde encontrarás una gran variedad de
        productos y categorías a precios que te encantarán. 
        ¡Explora, elige y disfruta de tus compras sin complicaciones!
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button className="flex items-center gap-2 bg-primary-700 text-black font-semibold px-5 py-3 rounded-xl shadow hover:bg-primary-300 transition">
          <ShoppingBag size={20} />
          Explorar productos
        </button>

  
      </div>
    </section>
  );
};

export default Welcome;