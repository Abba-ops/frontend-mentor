import ProductList from "./components/ProductList";
import CartSummary from "./components/CartSummary";

export default function App() {
  return (
    <main className="max-w-7xl mx-auto py-8 md:my-16 grid grid-cols-3 gap-7 items-start px-6">
      <ProductList />
      <CartSummary />
    </main>
  );
}
