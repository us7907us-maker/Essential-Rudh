"use client";
import { useState } from "react";
import { ShoppingBag, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({ product }: { product: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // ✅ Cart mein save karne ki logic
  const addToCart = () => {
    addItem({
      ...product,
      id: product._id,
      quantity: 1
    });
    alert("Added to your cart.");
  };

  // ✅ Buy Now: Pehle cart mein daalo, phir Checkout pe bhago
  const handleBuyNow = () => {
    setLoading(true);
    addToCart();
    router.push("/checkout"); // Seedha Checkout Page par
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* ADD TO CART */}
      <button 
        onClick={addToCart}
        className="flex-1 border-2 border-black py-5 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 group"
      >
        <ShoppingBag className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform" />
        Add to Cart
      </button>

      {/* BUY NOW */}
      <button 
        onClick={handleBuyNow}
        disabled={loading}
        className="flex-1 bg-black text-white py-5 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold hover:text-black transition-all duration-500 shadow-xl"
      >
        <Zap className="w-4 h-4 mr-3 fill-current" />
        {loading ? "Please wait..." : "Buy now"}
      </button>
    </div>
  );
}